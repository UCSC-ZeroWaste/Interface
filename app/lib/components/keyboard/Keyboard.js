import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import KeyboardButton from './KeyboardButton';

import LatinLayout from './layouts/LatinLayout';
import SymbolsLayout from './layouts/SymbolsLayout';

import BackspaceIcon from './icons/BackspaceIcon';
import LanguageIcon from './icons/LanguageIcon';
import ShiftIcon from './icons/ShiftIcon';
import styles from '../../../App.scss';

export default class Keyboard extends PureComponent {
	static propTypes = {
		leftButtons: PropTypes.arrayOf(PropTypes.node),
		rightButtons: PropTypes.arrayOf(PropTypes.node),
		inputNode: PropTypes.any.isRequired,
		onClick: PropTypes.func,
		isFirstLetterUppercase: PropTypes.bool,
		layouts: PropTypes.arrayOf(PropTypes.shape({
			symbolsKeyValue: PropTypes.string,
			layout: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
		})),
	};

	static defaultProps = {
		leftButtons: [],
		rightButtons: [],
		isFirstLetterUppercase: false,
		layouts: [LatinLayout],
	};

	state = {
		currentLayout: 0,
		showSymbols: false,
		uppercase: this.isUppercase(),
	}

	handleLanguageClick = () => {
		this.setState({
			currentLayout: (this.state.currentLayout + 1) % this.props.layouts.length,
			showSymbols: false,
		});

		this.props.inputNode.focus();
	}

	handleShiftClick = () => {
		this.setState({uppercase: !this.state.uppercase});

		this.props.inputNode.focus();
	}

	handleSymbolsClick = () => {
		this.setState({showSymbols: !this.state.showSymbols});

		this.props.inputNode.focus();
	}

	handleLetterButtonClick = (key) => {
		const {inputNode} = this.props;
		const {value, selectionStart, selectionEnd} = inputNode;
		const nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);

		inputNode.value = nextValue;
		if (this.props.onClick) {
			this.props.onClick(nextValue);
		}
		setTimeout(() => {
			inputNode.focus();
			inputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
		}, 0);
		this.setState({uppercase: this.isUppercase()});
		inputNode.dispatchEvent(new Event('input', {bubbles: true}));
	}

	handleBackspaceClick = () => {
		const {inputNode} = this.props;
		const {value, selectionStart, selectionEnd} = inputNode;
		let nextValue;
		let nextSelectionPosition;
		if (selectionStart === selectionEnd) {
			nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
			nextSelectionPosition = selectionStart - 1;
		} else {
			nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
			nextSelectionPosition = selectionStart;
		}
		nextSelectionPosition = (nextSelectionPosition > 0) ? nextSelectionPosition : 0;

		inputNode.value = nextValue;
		if (this.props.onClick) {
			this.props.onClick(nextValue);
		}
		setTimeout(() => {
			inputNode.focus();
			inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
		}, 0);
		this.setState({uppercase: this.isUppercase()});
		inputNode.dispatchEvent(new Event('input', {bubbles: true}));
	}

	isUppercase() {
		const {inputNode, isFirstLetterUppercase} = this.props;
		return inputNode.type !== 'password' &&
			inputNode.dataset.type !== 'email' &&
			!inputNode.value.length && isFirstLetterUppercase;
	}

	getKeys() {
		let keysSet;
		if (this.state.showSymbols) {
			keysSet = SymbolsLayout.layout;
		} else {
			keysSet = this.props.layouts[this.state.currentLayout].layout;
		}

		return this.state.uppercase ?
			keysSet.map(keyRow => keyRow.map(key => key.toUpperCase()))
			: keysSet;
	}

	getSymbolsKeyValue() {
		if (this.state.showSymbols) {
			return this.props.layouts[this.state.currentLayout].symbolsKeyValue;
		}
		return SymbolsLayout.symbolsKeyValue;
	}

	render() {
		const {leftButtons, rightButtons, inputNode} = this.props;
		const keys = this.getKeys();
		const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
		const symbolsKeyValue = this.getSymbolsKeyValue();

		return (
			<div className={styles.keyboard}>
				<div className={styles['keyboard-row']}>
					{numbers.map(button =>
						<KeyboardButton
							value={button}
							onClick={this.handleLetterButtonClick}
							classes="keyboard-numberButton"
							key={button}
						/>
					)}
					<KeyboardButton
						value={<BackspaceIcon />}
						classes="keyboard-backspaceButton"
						onClick={this.handleBackspaceClick}
					/>
				</div>

				<div className={styles['keyboard-row']}>
					{keys[0].map(button =>
						<KeyboardButton
							value={button}
							onClick={this.handleLetterButtonClick}
							key={button}
						/>
					)}
				</div>

				<div className={styles['keyboard-row']}>
					<div className={styles['keyboard-halfButton']} />
					{keys[1].map(button =>
						<KeyboardButton
							value={button}
							onClick={this.handleLetterButtonClick}
							key={button}
						/>
					)}
					<div className={styles['keyboard-halfButton']} />
				</div>

				<div className={styles['keyboard-row']}>
					<KeyboardButton
						value={<ShiftIcon />}
						classes="keyboard-shiftButton"
						onClick={this.handleShiftClick}
					/>
					{keys[2].map(button =>
						<KeyboardButton
							value={button}
							onClick={this.handleLetterButtonClick}
							key={button}
						/>
					)}
					<KeyboardButton
						value={symbolsKeyValue}
						classes="keyboard-symbolButton"
						onClick={this.handleSymbolsClick}
					/>
				</div>

				<div className={styles['keyboard-row']}>
					{leftButtons}
					{this.props.layouts.length > 1 ?
						<KeyboardButton
							value={<LanguageIcon />}
							classes="keyboard-languageButton"
							onClick={this.handleLanguageClick}
						/>
					: null}
					{inputNode.dataset.type === 'email' ?
						<KeyboardButton
							value={'@'}
							classes="keyboard-atButton"
							onClick={this.handleLetterButtonClick}
						/>
					: null}
					<KeyboardButton
						value={' '}
						classes="keyboard-spaceButton"
						onClick={this.handleLetterButtonClick}
					/>
					{inputNode.dataset.type === 'email' ?
						<KeyboardButton
							value={'.'}
							classes="keyboard-fullstopButton"
							onClick={this.handleLetterButtonClick}
						/>
					: null}
					{rightButtons}
				</div>
			</div>
		);
	}
}
