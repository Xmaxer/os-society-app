/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
	__typename: "User"
	/**
	 * A valid username
	 */
	username: string
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * Whether the user needs a password reset or not
	 */
	resetPassword: boolean
}

export interface Login_login {
	__typename: "LoginMutationPayload"
	/**
	 * A valid token
	 */
	token: string
	/**
	 * A valid user
	 */
	user: Login_login_user
}

export interface Login {
	/**
	 * Login with valid credentials, returns a valid token if successful.
	 */
	login: Login_login | null
}

export interface LoginVariables {
	username: string
	password: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_logout {
	__typename: "LogoutMutationPayload"
	/**
	 * True if logged out of current session
	 */
	success: boolean
}

export interface Logout {
	/**
	 * Logout of the current session (Invalidates token)
	 */
	logout: Logout_logout | null
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Authenticated
// ====================================================

export interface Authenticated_isAuthenticated {
	__typename: "User"
	/**
	 * A valid username
	 */
	username: string
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * Whether the user needs a password reset or not
	 */
	resetPassword: boolean
}

export interface Authenticated {
	/**
	 * Checks whether the login you're authenticated or not
	 */
	isAuthenticated: Authenticated_isAuthenticated | null
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Players
// ====================================================

export interface Players_players {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
	/**
	 * Any previous names this player had
	 */
	previousNames: string[]
	/**
	 * A valid rank number
	 */
	rank: number
	/**
	 * The date this player record was created
	 */
	createdAt: any
	/**
	 * The date this player record was updated
	 */
	updatedAt: any
	/**
	 * Optional extra comments
	 */
	comment: string | null
	/**
	 * A valid non-future join date
	 */
	joinDate: any
}

export interface Players {
	/**
	 * Returns a list of players
	 */
	players: Players_players[]
	/**
	 * Counts the total number of players
	 */
	totalPlayers: number
}

export interface PlayersVariables {
	order?: OrderEnum | null
	orderBy?: PlayerOrderEnum | null
	usernameContains?: string | null
	previousNameContains?: string | null
	usernameOrPreviousNameContains?: string | null
	first?: number | null
	skip?: number | null
	rankContains?: number[] | null
	startJoinDate?: any | null
	endJoinDate?: any | null
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePlayer
// ====================================================

export interface CreatePlayer_createPlayer_player {
	__typename: "Player"
	/**
	 * A valid username
	 */
	username: string
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid non-future join date
	 */
	joinDate: any
	/**
	 * A valid rank number
	 */
	rank: number
	/**
	 * Optional extra comments
	 */
	comment: string | null
	/**
	 * Any previous names this player had
	 */
	previousNames: string[]
	/**
	 * The date this player record was created
	 */
	createdAt: any
	/**
	 * The date this player record was updated
	 */
	updatedAt: any
}

export interface CreatePlayer_createPlayer {
	__typename: "CreatePlayerMutationPayload"
	player: CreatePlayer_createPlayer_player
}

export interface CreatePlayer {
	createPlayer: CreatePlayer_createPlayer | null
}

export interface CreatePlayerVariables {
	username: string
	joinDate: any
	rank: number
	comment?: string | null
	previousNames?: string[] | null
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePlayer
// ====================================================

export interface DeletePlayer_deletePlayer_player {
	__typename: "Player"
	/**
	 * A valid username
	 */
	username: string
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * Optional extra comments
	 */
	comment: string | null
	/**
	 * A valid rank number
	 */
	rank: number
	/**
	 * Any previous names this player had
	 */
	previousNames: string[]
	/**
	 * A valid non-future join date
	 */
	joinDate: any
	/**
	 * The date this player record was created
	 */
	createdAt: any
	/**
	 * The date this player record was updated
	 */
	updatedAt: any
}

export interface DeletePlayer_deletePlayer {
	__typename: "DeletePlayerMutationPayload"
	player: DeletePlayer_deletePlayer_player
}

export interface DeletePlayer {
	deletePlayer: DeletePlayer_deletePlayer | null
}

export interface DeletePlayerVariables {
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePlayer
// ====================================================

export interface UpdatePlayer_updatePlayer_player {
	__typename: "Player"
	/**
	 * A valid username
	 */
	username: string
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid non-future join date
	 */
	joinDate: any
	/**
	 * A valid rank number
	 */
	rank: number
	/**
	 * Optional extra comments
	 */
	comment: string | null
	/**
	 * Any previous names this player had
	 */
	previousNames: string[]
	/**
	 * The date this player record was created
	 */
	createdAt: any
	/**
	 * The date this player record was updated
	 */
	updatedAt: any
}

export interface UpdatePlayer_updatePlayer {
	__typename: "UpdatePlayerMutationPayload"
	player: UpdatePlayer_updatePlayer_player
}

export interface UpdatePlayer {
	updatePlayer: UpdatePlayer_updatePlayer | null
}

export interface UpdatePlayerVariables {
	username: string
	joinDate: any
	rank: number
	comment?: string | null
	previousNames?: string[] | null
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetPassword
// ====================================================

export interface SetPassword_updateUser_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
	/**
	 * Whether the user needs a password reset or not
	 */
	resetPassword: boolean
}

export interface SetPassword_updateUser {
	__typename: "ResetPasswordMutationPayload"
	user: SetPassword_updateUser_user
}

export interface SetPassword {
	updateUser: SetPassword_updateUser | null
}

export interface SetPasswordVariables {
	id: string
	password: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCompetition
// ====================================================

export interface CreateCompetition_createCompetition_competition_competitionRecords_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface CreateCompetition_createCompetition_competition_competitionRecords_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: CreateCompetition_createCompetition_competition_competitionRecords_payout_user
}

export interface CreateCompetition_createCompetition_competition_competitionRecords_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface CreateCompetition_createCompetition_competition_competitionRecords {
	__typename: "CompetitionRecord"
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * The XP gained
	 */
	xp: any
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: CreateCompetition_createCompetition_competition_competitionRecords_payout | null
	/**
	 * The associated player
	 */
	player: CreateCompetition_createCompetition_competition_competitionRecords_player
}

export interface CreateCompetition_createCompetition_competition {
	__typename: "Competition"
	/**
	 * Returns a list of competition records belonging to the object
	 */
	competitionRecords: CreateCompetition_createCompetition_competition_competitionRecords[]
	/**
	 * The external competition URL
	 */
	externalUrl: string | null
	/**
	 * The unique ID of the competition
	 */
	id: string
}

export interface CreateCompetition_createCompetition {
	__typename: "CreateCompetitionMutationPayload"
	competition: CreateCompetition_createCompetition_competition
}

export interface CreateCompetition {
	createCompetition: CreateCompetition_createCompetition | null
}

export interface CreateCompetitionVariables {
	externalUrl?: string | null
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCompetition
// ====================================================

export interface UpdateCompetition_updateCompetition_competition_competitionRecords_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface UpdateCompetition_updateCompetition_competition_competitionRecords_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: UpdateCompetition_updateCompetition_competition_competitionRecords_payout_user
}

export interface UpdateCompetition_updateCompetition_competition_competitionRecords_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface UpdateCompetition_updateCompetition_competition_competitionRecords {
	__typename: "CompetitionRecord"
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * The XP gained
	 */
	xp: any
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: UpdateCompetition_updateCompetition_competition_competitionRecords_payout | null
	/**
	 * The associated player
	 */
	player: UpdateCompetition_updateCompetition_competition_competitionRecords_player
}

export interface UpdateCompetition_updateCompetition_competition {
	__typename: "Competition"
	/**
	 * Returns a list of competition records belonging to the object
	 */
	competitionRecords: UpdateCompetition_updateCompetition_competition_competitionRecords[]
	/**
	 * The external competition URL
	 */
	externalUrl: string | null
	/**
	 * The unique ID of the competition
	 */
	id: string
}

export interface UpdateCompetition_updateCompetition {
	__typename: "UpdateCompetitionMutationPayload"
	competition: UpdateCompetition_updateCompetition_competition
}

export interface UpdateCompetition {
	updateCompetition: UpdateCompetition_updateCompetition | null
}

export interface UpdateCompetitionVariables {
	externalUrl?: string | null
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCompetition
// ====================================================

export interface DeleteCompetition_deleteCompetition_competition_competitionRecords_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface DeleteCompetition_deleteCompetition_competition_competitionRecords_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: DeleteCompetition_deleteCompetition_competition_competitionRecords_payout_user
}

export interface DeleteCompetition_deleteCompetition_competition_competitionRecords_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface DeleteCompetition_deleteCompetition_competition_competitionRecords {
	__typename: "CompetitionRecord"
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * The XP gained
	 */
	xp: any
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: DeleteCompetition_deleteCompetition_competition_competitionRecords_payout | null
	/**
	 * The associated player
	 */
	player: DeleteCompetition_deleteCompetition_competition_competitionRecords_player
}

export interface DeleteCompetition_deleteCompetition_competition {
	__typename: "Competition"
	/**
	 * Returns a list of competition records belonging to the object
	 */
	competitionRecords: DeleteCompetition_deleteCompetition_competition_competitionRecords[]
	/**
	 * The external competition URL
	 */
	externalUrl: string | null
	/**
	 * The unique ID of the competition
	 */
	id: string
}

export interface DeleteCompetition_deleteCompetition {
	__typename: "DeleteCompetitionMutationPayload"
	/**
	 * A unique identifier for the client performing the mutation.
	 */
	clientMutationId: string | null
	competition: DeleteCompetition_deleteCompetition_competition
}

export interface DeleteCompetition {
	deleteCompetition: DeleteCompetition_deleteCompetition | null
}

export interface DeleteCompetitionVariables {
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCompetitionRecord
// ====================================================

export interface CreateCompetitionRecord_createCompetitionRecord_competitionRecord_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface CreateCompetitionRecord_createCompetitionRecord_competitionRecord_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface CreateCompetitionRecord_createCompetitionRecord_competitionRecord_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: CreateCompetitionRecord_createCompetitionRecord_competitionRecord_payout_user
}

export interface CreateCompetitionRecord_createCompetitionRecord_competitionRecord {
	__typename: "CompetitionRecord"
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * The XP gained
	 */
	xp: any
	/**
	 * The associated player
	 */
	player: CreateCompetitionRecord_createCompetitionRecord_competitionRecord_player
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: CreateCompetitionRecord_createCompetitionRecord_competitionRecord_payout | null
}

export interface CreateCompetitionRecord_createCompetitionRecord {
	__typename: "CreateCompetitionRecordMutationPayload"
	competitionRecord: CreateCompetitionRecord_createCompetitionRecord_competitionRecord
}

export interface CreateCompetitionRecord {
	createCompetitionRecord: CreateCompetitionRecord_createCompetitionRecord | null
}

export interface CreateCompetitionRecordVariables {
	xp: any
	position: any
	playerId: string
	competitionId: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCompetitionRecord
// ====================================================

export interface UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_payout_user
}

export interface UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord {
	__typename: "CompetitionRecord"
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * The XP gained
	 */
	xp: any
	/**
	 * The associated player
	 */
	player: UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_player
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_payout | null
}

export interface UpdateCompetitionRecord_updateCompetitionRecord {
	__typename: "UpdateCompetitionRecordMutationPayload"
	competitionRecord: UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord
}

export interface UpdateCompetitionRecord {
	updateCompetitionRecord: UpdateCompetitionRecord_updateCompetitionRecord | null
}

export interface UpdateCompetitionRecordVariables {
	xp: any
	position: any
	playerId: string
	competitionId: string
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCompetitionRecord
// ====================================================

export interface DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_payout_user
}

export interface DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord {
	__typename: "CompetitionRecord"
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * The XP gained
	 */
	xp: any
	/**
	 * The associated player
	 */
	player: DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_player
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_payout | null
}

export interface DeleteCompetitionRecord_deleteCompetitionRecord {
	__typename: "DeleteCompetitionRecordMutationPayload"
	competitionRecord: DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord
}

export interface DeleteCompetitionRecord {
	deleteCompetitionRecord: DeleteCompetitionRecord_deleteCompetitionRecord | null
}

export interface DeleteCompetitionRecordVariables {
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePayout
// ====================================================

export interface CreatePayout_createPayout_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface CreatePayout_createPayout_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: CreatePayout_createPayout_payout_user
}

export interface CreatePayout_createPayout {
	__typename: "CreatePayoutMutationPayload"
	payout: CreatePayout_createPayout_payout
}

export interface CreatePayout {
	createPayout: CreatePayout_createPayout | null
}

export interface CreatePayoutVariables {
	amount: number
	paidById: string
	competitionRecordId: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePayout
// ====================================================

export interface UpdatePayout_updatePayout_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface UpdatePayout_updatePayout_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: UpdatePayout_updatePayout_payout_user
}

export interface UpdatePayout_updatePayout {
	__typename: "UpdatePayoutMutationPayload"
	payout: UpdatePayout_updatePayout_payout
}

export interface UpdatePayout {
	updatePayout: UpdatePayout_updatePayout | null
}

export interface UpdatePayoutVariables {
	amount: number
	paidById: string
	competitionRecordId: string
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePayout
// ====================================================

export interface DeletePayout_deletePayout_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface DeletePayout_deletePayout_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: DeletePayout_deletePayout_payout_user
}

export interface DeletePayout_deletePayout {
	__typename: "DeletePayoutMutationPayload"
	payout: DeletePayout_deletePayout_payout
}

export interface DeletePayout {
	deletePayout: DeletePayout_deletePayout | null
}

export interface DeletePayoutVariables {
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Competitions
// ====================================================

export interface Competitions_competitions_competitionRecords_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface Competitions_competitions_competitionRecords_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: Competitions_competitions_competitionRecords_payout_user
}

export interface Competitions_competitions_competitionRecords_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface Competitions_competitions_competitionRecords {
	__typename: "CompetitionRecord"
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: Competitions_competitions_competitionRecords_payout | null
	/**
	 * The associated player
	 */
	player: Competitions_competitions_competitionRecords_player
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * The XP gained
	 */
	xp: any
	/**
	 * The unique ID of the competition
	 */
	id: string
}

export interface Competitions_competitions {
	__typename: "Competition"
	/**
	 * Returns a list of competition records belonging to the object
	 */
	competitionRecords: Competitions_competitions_competitionRecords[]
	/**
	 * The external competition URL
	 */
	externalUrl: string | null
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * The date time the competition was created at
	 */
	createdAt: string | null
}

export interface Competitions {
	/**
	 * Returns a list of competitions
	 */
	competitions: Competitions_competitions[]
}

export interface CompetitionsVariables {
	externalUrlContains?: string | null
	order?: OrderEnum | null
	orderBy?: CompetitionOrderEnum | null
	first?: number | null
	skip?: number | null
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompetitionRecords
// ====================================================

export interface CompetitionRecords_competitionRecords_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface CompetitionRecords_competitionRecords_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: CompetitionRecords_competitionRecords_payout_user
}

export interface CompetitionRecords_competitionRecords_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface CompetitionRecords_competitionRecords {
	__typename: "CompetitionRecord"
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: CompetitionRecords_competitionRecords_payout | null
	/**
	 * The associated player
	 */
	player: CompetitionRecords_competitionRecords_player
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * The XP gained
	 */
	xp: any
}

export interface CompetitionRecords {
	/**
	 * Returns a list of competition records belonging to the object
	 */
	competitionRecords: CompetitionRecords_competitionRecords[]
}

export interface CompetitionRecordsVariables {
	startPosition?: number | null
	endPosition?: number | null
	startXp?: number | null
	endXp?: number | null
	first?: number | null
	skip?: number | null
	competitionId?: string | null
	order?: OrderEnum | null
	orderBy?: CompetitionRecordOrderEnum | null
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Competition
// ====================================================

export interface Competition_competition_competitionRecords_payout_user {
	__typename: "User"
	/**
	 * The unique ID of the user
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface Competition_competition_competitionRecords_payout {
	__typename: "Payout"
	/**
	 * The unique ID of the payout
	 */
	id: string
	/**
	 * The amount paid out
	 */
	amount: any
	/**
	 * The user that paid it
	 */
	user: Competition_competition_competitionRecords_payout_user
}

export interface Competition_competition_competitionRecords_player {
	__typename: "Player"
	/**
	 * The unique ID of the player
	 */
	id: string
	/**
	 * A valid username
	 */
	username: string
}

export interface Competition_competition_competitionRecords {
	__typename: "CompetitionRecord"
	/**
	 * The unique ID of the competition
	 */
	id: string
	/**
	 * The XP gained
	 */
	xp: any
	/**
	 * The ranking within the competition
	 */
	position: number
	/**
	 * Gets a specific payout for the competition record
	 */
	payout: Competition_competition_competitionRecords_payout | null
	/**
	 * The associated player
	 */
	player: Competition_competition_competitionRecords_player
}

export interface Competition_competition {
	__typename: "Competition"
	/**
	 * Returns a list of competition records belonging to the object
	 */
	competitionRecords: Competition_competition_competitionRecords[]
	/**
	 * The external competition URL
	 */
	externalUrl: string | null
	/**
	 * The unique ID of the competition
	 */
	id: string
}

export interface Competition {
	/**
	 * Gets a specific competition object
	 */
	competition: Competition_competition | null
}

export interface CompetitionVariables {
	id: string
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum CompetitionOrderEnum {
	CREATED_AT = "CREATED_AT",
}

export enum CompetitionRecordOrderEnum {
	POSITION = "POSITION",
	XP = "XP",
}

export enum OrderEnum {
	ASC = "ASC",
	DESC = "DESC",
}

export enum PlayerOrderEnum {
	CREATED_AT = "CREATED_AT",
	ID = "ID",
	JOIN_DATE = "JOIN_DATE",
	RANK = "RANK",
	UPDATED_AT = "UPDATED_AT",
	USERNAME = "USERNAME",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
