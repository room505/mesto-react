import { useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'
import '../src/pages/index.css'

function App() {
	return (
		<div className='page'>
			<div className='page__content'>
				<Header />
				<Main />
				<Footer />
			</div>
		</div>
	)
}

export default App
