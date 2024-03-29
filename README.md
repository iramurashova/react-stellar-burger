# Каноническая работа проекта Stellar Burger
- веб-приложение, которое позволяет пользователям регистрироваться, создавать заказы, просматривать все заказы и каждый заказ отдельно.
Также пользователи могут редактировать свои данные в личном кабинете.

В проекте используется библиотека React, основанная на сборке Create React App с флагом -template ts, чтобы компилировать компоненты с разметкой и файлы JavaScript в TypeScript.
В работе используются UI-компоненты из внутренней библиотеки Яндекс.Практикума: счётчики, иконки, переключатели, типографика, система отступов и т.п.
Приложение имеет каскадную структуру компонентов с разметкой, где главный компонент App рендерится в корневой блок div. Для модальных окон используется функционал react-create-portal, который позволяет отображать их поверх основного содержимого.

В приложении реализован роутинг с помощью библиотеки React Router DOM. Для управления роутингом используются хуки useHistory, useParams и useLocation.

React DnD используется для интерактивного перемещения элементов и формирования корзины. Управление состоянием осуществляется с помощью React Redux Toolkit, разбитого на 5 частей: пользователь, данные, конструктор, модальные окна и формирование заказа.

Для получения заказов в реальном времени используется WebSocket. Аутентификация реализована с помощью Access Token и Refresh Token.

Главная страница приложения разделена на 2 части: слева - список доступных ингредиентов для заказа, и справа - список выбранных ингредиентов в корзине. Для оформления заказа и получения номера заказа необходимо войти в систему и обязательно выбрать булку как основу для бургера.

## **Стек:**
1. React
2. Redux
3. React DND
4. React router
5. WebSocket
6. Typescript
7. Jest
8. Cypress
## **Ссылки**
Проект, развернутый на удаленном сервере - http://stellarburger.murashova.nomoredomainsmonster.ru/

Макет - https://www.figma.com/file/tLatiSwpQmOsE3nSReMmqN/React_Bootcamp_%D0%9F%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D1%8B%D0%B5-%D0%B7%D0%B0%D0%B4%D0%B0%D1%87%D0%B8_external_link?type=design&node-id=0-1&mode=design

## **Планы по доработке**
* Мобильная версия приложения
* Рефакторинг


