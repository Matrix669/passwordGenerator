import { useState } from 'react'

function App() {
	const [inputLengthValue, setInputLengthValue] = useState(12)
	const [showPass, setShowPass] = useState(false)
	const [randomPass, setRandomPass] = useState('')
	const [isChecked, setIsChecked] = useState({
		specialCharacters: false,
		numbers: false,
		capitalLetters: false,
	})
	const [hashPass, setHashPass] = useState(true)

	function generatePass(passLength) {
		let characters = 'abcdefghijklmnopqrstuvwxyz'
		let capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
		let numbers = '0123456789'
		let specialCharacters = '`!@#$%^&*()-_=+,<.>/?~'

		if (isChecked.specialCharacters) {
			characters += specialCharacters
		}
		if (isChecked.numbers) {
			characters += numbers
		}
		if (isChecked.capitalLetters) {
			characters += capitalLetters
		}

		let result = ''
		for (let i = 1; i <= passLength; i++) {
			result += characters.charAt(Math.floor(Math.random() * characters.length))
			// result += '*'
		}
		handleVisiblePasswordClick(result)
		return result
	}

	function handleGenerateRandomPass() {
		const randomPass = generatePass(inputLengthValue)
		setRandomPass(randomPass)
		setShowPass(true)
	}

	function handleCheckbox(event) {
		const { name, checked } = event.target
		setIsChecked(prevChecked => {
			return { ...prevChecked, [name]: checked }
		})
	}

	function handleVisiblePasswordClick(result) {
		setHashPass(prevHashPass => !prevHashPass)
		// setRandomPass(prevPass => {
		// 	// for (let i = 1; i <= prevPass.length; i++) {

		// 	// 	result += '*'
		// 	// }
		// 	// return result
		// 	let passLetters = prevPass.split('')
		// 	result = passLetters.replace(/[a-zA-Z]/g, "*")
		// 	return result
		// })
	}

	return (
		<div className='card'>
			<div className='card__boxLength'>
				<label htmlFor='lengthOfPass'>Długość hasła: </label>
				<input
					type='number'
					id='lengthOfPass'
					min={3}
					value={inputLengthValue}
					onChange={event => setInputLengthValue(event.target.value)}
				/>
			</div>
			<div className='card__box'>
				<input
					name='specialCharacters'
					type='checkbox'
					id='specialCharacters'
					checked={isChecked.specialCharacters}
					onChange={handleCheckbox}
				/>
				<label htmlFor='specialCharacters'>Znaki specjalne</label>
			</div>
			<div className='card__box'>
				<input name='numbers' type='checkbox' id='numbers' checked={isChecked.numbers} onChange={handleCheckbox} />
				<label htmlFor='numbers'>Numery</label>
			</div>
			<div className='card__box'>
				<input
					name='capitalLetters'
					type='checkbox'
					id='capitalLetters'
					checked={isChecked.capitalLetters}
					onChange={handleCheckbox}
				/>
				<label htmlFor='capitalLetters'>Wielkie litery</label>
			</div>
			<button className='card__btnGenerate' onClick={handleGenerateRandomPass}>
				Generuj hasło
			</button>
			{showPass && (
				<div className='card__password-box'>
					<strong>Twoje hasło:</strong>
					<p>{randomPass}</p>
					<div className='card__password-box__buttons'>
						<button onClick={handleVisiblePasswordClick}>{hashPass ? 'Pokaż' : 'Ukryj'}</button>
						<button>Kopiuj</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default App
