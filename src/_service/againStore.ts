import { create } from 'zustand'

interface memberStoreType {
	memberNumber: string;
	setMemberNumber: (memberNumber: string) => void;
	memberId: string;
	setMemberId: (memberId: string) => void;
	memberType: string;
	setMemberType: (memberType: string) => void;
}

export const memberStore = create<memberStoreType>((set) =>
	({
		memberNumber: '',
		setMemberNumber: (memberNumber) => { set((state) => ({ memberNumber: memberNumber }))},
		memberId: '',
		setMemberId: (memberId) => { set((state) => ({ memberId: memberId }))},
		memberType: '',
		setMemberType: (memberType) => { set((state) => ({ memberType: memberType }))}
	})
)


interface contentStoreType {
	subMenu: boolean;
	setSubMenu: (subMenu: boolean) => void;
}
export const contentStore = create<contentStoreType>((set) =>
	({
		subMenu: true,
		setSubMenu: (subMenu) => { set((state) => ({ subMenu: subMenu }))}
	})
)