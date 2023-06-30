import {create} from 'zustand'
import {persist} from 'zustand/middleware'


interface contentStoreType {
	subMenu: boolean,
	setSubMenu: (subMenu: boolean) => void
}
export const contentStore = create<any>(
	persist(
(set) => ({
			subMenu: true,
			setSubMenu: (value: any) => { set(() => ({ subMenu: value }))},
			// 	setMemberType: (memberType) => { set((state) => ({ ...state, memberType: memberType }))}
			// setMemberStore:() => {set(() =>({ memberNumber: '', memberId:'', memberType: ''}))}
		}),
		//  아래의 name은 localstore의 key가 된다.
		{ name: 'againJob_contentStore'}
	)
)