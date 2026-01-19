import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	OptionType,
	ArticleStateType,
	defaultArticleState,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';

import { useState, FormEvent } from 'react';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [fontFamily, setFontFamily] = useState<OptionType>(
		initialState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		initialState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		initialState.fontColor
	);
	const [backgroundColor, setBackgroundColor] = useState<OptionType>(
		initialState.backgroundColor
	);

	const [contentWidth, setContentWidth] = useState<OptionType>(
		initialState.contentWidth
	);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onApply({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor,
			backgroundColor,
			contentWidth,
		});
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen((prev) => !prev)} />

			{isOpen && (
				<div className={styles.overlay} onClick={() => setIsOpen(false)} />
			)}

			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						onChange={setFontFamily}
						onClose={() => {}}
						title='Шрифт'
					/>
					<RadioGroup
						name='fontSize'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
						title='Размеры шрифта'
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
						onClose={() => {}}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
						onClose={() => {}}
						title='Цвет фона'
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
						onClose={() => {}}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' onClick={handleReset} type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
