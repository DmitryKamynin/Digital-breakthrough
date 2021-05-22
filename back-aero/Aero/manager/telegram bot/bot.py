import settings
import telebot
from telebot import types
from datetime import datetime

bot = telebot.TeleBot(settings.token, parse_mode=None)
print("start")
from db import *
issue = ''
lat = None
long = None
person = ''
unit = ''
time_create = ''


@bot.message_handler(commands=['start'])
def start_message(message):
    keyboard = telebot.types.ReplyKeyboardMarkup(True)
    button_geo = types.KeyboardButton(text="Отправить местоположение проблемы", request_location=True)
    keyboard.add(button_geo)
    bot.send_message(message.chat.id, 'Добрый день, теперь вы можете отправлять сюда все проблемы!',
                     reply_markup=keyboard)


@bot.message_handler(content_types=['location'])  # Получаем координаты
def location(message):
    global lat
    global long
    lat = message.location.latitude
    long = message.location.longitude

    problems_menu = telebot.types.ReplyKeyboardMarkup(True)

    for problem in GetData.get_problems():
        button = types.KeyboardButton(text=problem)
        problems_menu.add(button)
    bot.send_message(message.from_user.id, 'Выберите задачу', reply_markup=problems_menu)
    bot.register_next_step_handler(message, get_text_issue)


def get_text_issue(message):  # Получаем текст задачи

    if message.text in GetData.get_problems():
        global issue
        issue = message.text
        units_menu = telebot.types.ReplyKeyboardMarkup(True)
        units_menu.row_width = 2
        for problem in GetData.get_units():
            button = types.KeyboardButton(text=problem)
            units_menu.add(button)
        bot.send_message(message.from_user.id, 'Выберите юнита', reply_markup=units_menu)
        bot.register_next_step_handler(message, get_unit)
    else:
        problems_menu = telebot.types.ReplyKeyboardMarkup(True)
        for problem in GetData.get_problems():
            button = types.KeyboardButton(text=problem)
            problems_menu.add(button)
        bot.send_message(message.from_user.id, 'Выберите существующюю задачу', reply_markup=problems_menu)
        bot.register_next_step_handler(message, get_text_issue)


def get_unit(message):
    if message.text in GetData.get_units():
        global unit
        unit = message.text
        persons_menu = telebot.types.ReplyKeyboardMarkup(True)
        for person in GetData.get_persons():
            button = types.KeyboardButton(text=person)
            persons_menu.add(button)
        bot.send_message(message.from_user.id, 'Выберите персонажа', reply_markup=persons_menu)
        bot.register_next_step_handler(message, get_person)
    else:
        units_menu = telebot.types.ReplyKeyboardMarkup(True)
        for units in GetData.get_units():
            button = types.KeyboardButton(text=units)
            units_menu.add(button)
        bot.send_message(message.from_user.id, 'Выберите существующего юнита', reply_markup=units_menu)
        bot.register_next_step_handler(message, get_unit)


def get_person(message):
    if message.text in GetData.get_persons():
        global person
        person = message.text
        keyboard = types.InlineKeyboardMarkup()
        key_yes = types.InlineKeyboardButton(text='Да', callback_data='yes')
        keyboard.add(key_yes)  # добавляем кнопку в клавиатуру
        key_no = types.InlineKeyboardButton(text='Нет', callback_data='no')
        keyboard.add(key_no)
        question = f'Задание: \"{issue}\"\nПерсонаж: {person}\nЮнит: {unit}'
        bot.send_message(message.from_user.id, text=question, reply_markup=keyboard)
    else:
        persons_menu = telebot.types.ReplyKeyboardMarkup(True)
        for person in GetData.get_persons():
            button = types.KeyboardButton(text=person)
            persons_menu.add(button)
        bot.send_message(message.from_user.id, 'Выберите существующего персонажа', reply_markup=persons_menu)
        bot.register_next_step_handler(message, get_unit)


@bot.callback_query_handler(func=lambda call: True)
def callback_worker(call):
    global time_create
    if call.data == "yes":
        time_create = datetime.now()
        keyboard = telebot.types.ReplyKeyboardMarkup(True)
        button_geo = types.KeyboardButton(text="Отправить местоположение проблемы", request_location=True)
        keyboard.add(button_geo)
        bot.send_message(call.message.chat.id, 'Задача создана!)', reply_markup=keyboard)
        SetData.set_issue(lat, long, issue, unit, time_create, person)
    elif call.data == "no":
        keyboard = telebot.types.ReplyKeyboardMarkup(True)
        button_geo = types.KeyboardButton(text="Отправить местоположение проблемы", request_location=True)
        keyboard.add(button_geo)
        bot.send_message(call.message.chat.id, "Отправте заного местоположение проблемы", reply_markup=keyboard)


bot.polling()
