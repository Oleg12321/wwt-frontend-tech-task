import { useTranslation } from 'react-i18next'

type Props = {
	onConfirm: () => void
	onCancel: () => void
}

export const ConfirmModal = ({ onConfirm, onCancel }: Props) => {
	// Підключаємо хук для перекладів
	const { t } = useTranslation('filter')

	return (
		<>
			<div className="fixed inset-0 backdrop-blur-md bg-black/20 flex items-center justify-center">
				<div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
					<div className="flex items-center">
						{/* Замінюємо звичайний текст на функцію t() */}
						<h2 className="mx-auto text-center text-lg font-semibold mb-10">
							{t('confirmTitle', 'Do you want to apply new filter')}
						</h2>
						<button
							className="text-2xl bg-transparent border-0"
							onClick={onCancel}
						>
							✖
						</button>
					</div>

					<div className="flex gap-5">
						{/* Замінюємо звичайний текст на функцію t() */}
						<button
							onClick={onCancel}
							className="w-[280px] h-[64px] rounded-2xl border border-gray-300 bg-white"
						>
							{t('useOld', 'Use old filter')}
						</button>

						{/* Замінюємо звичайний текст на функцію t() */}
						<button
							onClick={onConfirm}
							className="w-[280px] h-[64px] rounded-2xl border border-gray-300 bg-orange-500 text-white"
						>
							{t('applyNew', 'Apply new filter')}
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
