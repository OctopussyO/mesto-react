import React from 'react';

function Main() {

  return (
    <main className="page__narrow">
      <div className="spinner" />
      <div className="content">
        <section className="profile">
          <div className="profile__image">
            <button className="profile__avatar-button" aria-label="Редактировать" type="button" />
          </div>
          <div className="profile__data">
            { /* Отключаем встроенное правило для следующей строки, чтобы консоль 
            не ругалась на отсутчтвие текста в заголовке */ }
            {  /* eslint-disable-next-line */ }
            <h1 className="profile__name" />
            <button className="profile__edit-button page__button" aria-label="Редактировать" type="button" />
            <p className="profile__profession" />
          </div>
          <button className="profile__add-button page__button" aria-label="Добавить" type="button" />
        </section>
        <section className="gallery">
        </section>
      </div>
    </main>
  )
}

export default Main;
