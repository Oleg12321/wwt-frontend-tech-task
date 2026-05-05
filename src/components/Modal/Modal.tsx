import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useQuery } from '@tanstack/react-query'

import { ConfirmModal } from '../../components/ConfirmModal/ConfirmModal'
import { getFilters } from '../../shared/api/getFilters/getFilters'
import { useFiltersStore } from '../../store/useFiltersStore'

type Props = {
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Modal = ({ isOpen, setIsOpen }: Props) => {
	const { data, isLoading } = useQuery({
		queryKey: ['filters'],
		queryFn: getFilters
	})
	const { t } = useTranslation('filter')
	const { filters, setFilters } = useFiltersStore()

	const [localFilters, setLocalFilters] = useState<Record<string, string[]>>({})
	const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false)

	useEffect(() => {
		setLocalFilters(structuredClone(filters))
	}, [filters])

	const isChanged = JSON.stringify(localFilters) !== JSON.stringify(filters)

	if (!isOpen) {
		return null
	}
	if (isLoading) {
		return (
			<div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">
				<div className="bg-white p-6 rounded-2xl shadow-xl">
					{t('loading', 'Loading filters...')}
				</div>
			</div>
		)
	}
	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">
				<div className="w-[700px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-6">
					<div className="flex items-center border-b pb-4 mb-4">
						<h1 className="mx-auto text-xl font-semibold">{t('title')}</h1>

						<button
							className="text-2xl cursor-pointer hover:opacity-70"
							onClick={() => setIsOpen(false)}
						>
							✖
						</button>
					</div>

					<div className="space-y-6">
						{data?.filterItems.map(section => (
							<div
								key={section.id}
								className="border-b pb-4 mb-4"
							>
								<h2 className="mb-2 font-semibold">{section.name}</h2>

								<div className="grid grid-cols-3 gap-2">
									{section.options.map(option => (
										<label
											key={option.id}
											htmlFor={option.id}
										>
											<input
												key={option.id}
												id={option.id}
												type="checkbox"
												checked={
													localFilters[section.id]?.includes(option.id) || false
												}
												onChange={e => {
													setLocalFilters(prev => {
														const current = prev[section.id] || []

														return {
															...prev,
															[section.id]: e.target.checked
																? [...current, option.id]
																: current.filter(id => id !== option.id)
														}
													})
												}}
											/>
											{option.name}
										</label>
									))}
								</div>
							</div>
						))}
					</div>

					<div className="flex items-center mt-6">
						<button
							className="mx-auto w-[184px] h-[64px] rounded-2xl bg-orange-500 text-white"
							onClick={() => setIsConfirmOpen(true)}
							disabled={!isChanged}
						>
							{t('apply')}
						</button>

						<p
							className="cursor-pointer underline"
							onClick={() => setLocalFilters({})}
						>
							{t('clear')}
						</p>
					</div>
				</div>
			</div>

			{isConfirmOpen && (
				<ConfirmModal
					onConfirm={() => {
						setFilters(localFilters)
						setIsConfirmOpen(false)
						setIsOpen(false)
					}}
					onCancel={() => {
						setLocalFilters(filters)
						setIsConfirmOpen(false)
					}}
				/>
			)}
		</>
	)
}
