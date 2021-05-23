import sqlite3
import settings
import psycopg2

usr = ""
passwd = ""
host = ""
db = ""

class GetData:
    @staticmethod
    def get_units() -> list:  # Возвращает список доступных юнитов
        units = list()
        con = psycopg2.connect(host=host, user=usr, password=passwd , dbname=db)
        with con:
            cur = con.cursor()
            cur.execute("SELECT * FROM manager_unit;")

            for i in cur.fetchall():
                if i[2]:
                    units.append(i[1])
        return units

    @staticmethod
    def get_persons() -> list:  # Возвращает список персонажей
        persons = list()
        con = psycopg2.connect(host=host, user=usr, password=passwd , dbname=db)
        with con:
            cur = con.cursor()
            cur.execute("SELECT id_telegram, first_name, last_name FROM manager_person;")
            for i in cur.fetchall():
                persons.append(i[1]+" "+i[2])
        return persons

    @staticmethod
    def get_problems() -> list:
        con = psycopg2.connect(host=host, user=usr, password=passwd , dbname=db)
        with con:
            cur = con.cursor()
            problems = list()
            cur.execute("SELECT name FROM manager_problem;")
            for i in cur.fetchall():
                problems.append(i[0])
        return problems

    @staticmethod
    def user_exist(id_telegram):
        con = psycopg2.connect(host=host, user=usr, password=passwd , dbname=db)
        with con:
            cur = con.cursor()
            cur.execute(f"SELECT first_name, last_name FROM manager_person where id_telegram={id_telegram};")
            if len(cur.fetchall()) == 0:
                return False
            else:
                return True




class SetData:
    @staticmethod
    def set_issue(lat, long, issue, unit, time_created, time_lead, person):
        con = psycopg2.connect(host=host, user=usr, password=passwd , dbname=db)
        with con:
            cur = con.cursor()
            print(time_created.strftime("%Y-%m-%d %H:%M:%S"))
            cur.execute(f"""INSERT INTO manager_issue(lat, long, issue, unit, time_created, time_lead, time_finish, person, status)
                                VALUES({lat}, {long}, '{issue}', '{unit}', '{time_created.strftime("%Y-%m-%d %H:%M:%S")}',
                                                                                            {time_lead}, '{time_created.strftime("%Y-%m-%d %H:%M:%S")}',
                                                                                            '{person}', 'assigned')""")
            con.commit()

    @staticmethod
    def create_user(first_name, last_name, id_telegram):
        con = psycopg2.connect(host=host, user=usr, password=passwd , dbname=db)
        with con:
            cur = con.cursor()
            cur.execute(f"""INSERT INTO manager_person(first_name, last_name, id_telegram, post)
                                        VALUES('{first_name}', '{last_name}', {id_telegram}, 'Рабочий')""")
            con.commit()
