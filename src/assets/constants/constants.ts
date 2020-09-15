export const MAX_USERNAME_LENGTH = 12

export enum PLAYER_ORDER_ENUM {
	PREVIOUS_NAMES = "PREVIOUS_NAMES",
	DAYS_IN_CC = "DAYS_IN_CC",
	COMMENT = "COMMENT",
	ACTIONS = "ACTIONS",
}

export const RANK_OPTIONS = [
	{ img: null, label: "Unranked", id: 0 },
	{ img: "/images/friend_rank.png", label: "Friend", id: 1 },
	{ img: "/images/recruit_rank.png", label: "Recruit", id: 2 },
	{ img: "/images/corporal_rank.png", label: "Corporal", id: 3 },
	{ img: "/images/sergeant_rank.png", label: "Sergeant", id: 4 },
	{ img: "/images/lieutenant_rank.png", label: "Lieutenant", id: 5 },
	{ img: "/images/captain_rank.png", label: "Captain", id: 6 },
	{ img: "/images/general_rank.png", label: "General", id: 7 },
	{ img: "/images/owner_rank.png", label: "Owner", id: 8 },
]
