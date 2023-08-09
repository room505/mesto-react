export default function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDeleteClick }) {
	return (
		<main className='content'>
			<section className='profile'>
				<div className='profile__card'>
					<button type='button' className='profile__avatar-button'>
						<img src='#' alt='Аватарка' className='profile__avatar' />
					</button>
					<div className='profile__info'>
						<h1 className='profile__author'>Автор</h1>
						<button className='profile__button-edit' type='button' />
						<p className='profile__about-the-author'>Об авторе</p>
					</div>
				</div>
				<button className='profile__add-button' type='button' />
			</section>
			<section className='elements'></section>
		</main>
	)
}
