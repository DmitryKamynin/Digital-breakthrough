import sqlite3


class GetData:
    @staticmethod
    def get_units() -> list:  # Возвращает список доступных юнитов
        conn = sqlite3.connect('../Aero/db.sqlite3')
        units = list()
        cur = conn.cursor()
        query = cur.execute("SELECT * FROM manager_unit;")
        for i in query.fetchall():
            if i[2]:
                units.append(i[1])
        cur.close()
        return units

    @staticmethod
    def get_persons() -> list:  # Возвращает список персонажей
        conn = sqlite3.connect('../Aero/db.sqlite3')
        persons = list()
        cur = conn.cursor()
        query = cur.execute("SELECT id_telegram, first_name, last_name FROM manager_person;")
        for i in query.fetchall():
            persons.append(i[1]+" "+i[2])
        cur.close()
        return persons

    @staticmethod
    def get_problems() -> list:
        conn = sqlite3.connect('../Aero/db.sqlite3')
        cur = conn.cursor()
        problems = list()
        query = cur.execute("SELECT name FROM manager_problem;")
        for i in query.fetchall():
            problems.append(i[0])
        cur.close()
        return problems


class SetData:
    @staticmethod
    def set_issue(lat, long, issue, unit, time_created, person):
        conn = sqlite3.connect('../Aero/db.sqlite3')
        cur = conn.cursor()
        print(time_created.strftime("%Y-%m-%d %H:%M:%S"))
        cur.execute(f"""INSERT INTO manager_issue(lat, long, issue, unit, time_created, person, status)
                            VALUES({lat}, {long}, '{issue}', '{unit}', '{time_created.strftime("%Y-%m-%d %H:%M:%S")}',
                                                                                        '{person}', 'assigned')""")
        conn.commit()
        conn.close()
