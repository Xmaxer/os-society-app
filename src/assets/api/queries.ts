import { MUTATION_OPERATION, QUERY_OPERATION } from "../constants/operations"
import gql from "graphql-tag"
import { DocumentNode } from "graphql"

export interface IRequest {
	type: typeof MUTATION_OPERATION | typeof QUERY_OPERATION
	query: DocumentNode
}

export type IOrderEnum = "ASC" | "DESC"
export type IPlayerOrderEnum =
	| "USERNAME"
	| "ID"
	| "JOIN_DATE"
	| "CREATED_AT"
	| "UPDATED_AT"
export type Maybe<T> = T | null

export const LOGIN_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation Login($username: String!, $password: String!) {
			login(
				input: {
					attributes: { username: $username, password: $password }
				}
			) {
				token
				user {
					username
					id
					resetPassword
				}
			}
		}
	`,
}

export const LOGOUT_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation Logout {
			logout(input: {}) {
				success
			}
		}
	`,
}

export const IS_AUTHENTICATED_QUERY: IRequest = {
	type: QUERY_OPERATION,
	query: gql`
		query Authenticated {
			isAuthenticated {
				username
				id
				resetPassword
			}
		}
	`,
}

export const PLAYERS_QUERY: IRequest = {
	type: QUERY_OPERATION,
	query: gql`
		query Players(
			$order: OrderEnum
			$orderBy: PlayerOrderEnum
			$usernameContains: String
			$previousNameContains: String
			$usernameOrPreviousNameContains: String
			$first: Int
			$skip: Int
			$rankContains: [Int!]
			$startJoinDate: ISO8601DateTime
			$endJoinDate: ISO8601DateTime
		) {
			players(
				order: { order: $order, orderBy: $orderBy }
				filter: {
					usernameContains: $usernameContains
					previousNameContains: $previousNameContains
					usernameOrPreviousNameContains: $usernameOrPreviousNameContains
					rankContains: $rankContains
					startJoinDate: $startJoinDate
					endJoinDate: $endJoinDate
				}
				first: $first
				skip: $skip
			) {
				id
				username
				previousNames
				rank
				createdAt
				updatedAt
				comment
				joinDate
			}
			totalPlayers
		}
	`,
}

export const CREATE_PLAYER_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation CreatePlayer(
			$username: String!
			$joinDate: ISO8601DateTime!
			$rank: Int!
			$comment: String
			$previousNames: [String!]
		) {
			createPlayer(
				input: {
					attributes: {
						username: $username
						rank: $rank
						joinDate: $joinDate
						previousNames: $previousNames
						comment: $comment
					}
				}
			) {
				player {
					username
					id
					joinDate
					rank
					comment
					previousNames
					createdAt
					updatedAt
				}
			}
		}
	`,
}

export const DELETE_PLAYER_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation DeletePlayer($id: ID!) {
			deletePlayer(input: { id: $id }) {
				player {
					username
					id
					comment
					rank
					previousNames
					joinDate
					createdAt
					updatedAt
				}
			}
		}
	`,
}

export const UPDATE_PLAYER_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation UpdatePlayer(
			$username: String!
			$joinDate: ISO8601DateTime!
			$rank: Int!
			$comment: String
			$previousNames: [String!]
			$id: ID!
		) {
			updatePlayer(
				input: {
					attributes: {
						username: $username
						rank: $rank
						joinDate: $joinDate
						previousNames: $previousNames
						comment: $comment
					}
					id: $id
				}
			) {
				player {
					username
					id
					joinDate
					rank
					comment
					previousNames
					createdAt
					updatedAt
				}
			}
		}
	`,
}

export interface ISetPasswordMutationData {
	updateUser: {
		user: {
			id: number
			username: string
			resetPassword: boolean
		}
	}
}

export interface ISetPasswordMutationVariables {
	id: number
	password: string
}

export const SET_PASSWORD_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation SetPassword($id: ID!, $password: String!) {
			updateUser(
				input: { attributes: { password: $password }, id: $id }
			) {
				user {
					id
					username
					resetPassword
				}
			}
		}
	`,
}

export const CREATE_COMPETITION_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation CreateCompetition($externalUrl: String) {
			createCompetition(
				input: { attributes: { externalUrl: $externalUrl } }
			) {
				competition {
					competitionRecords {
						id
						xp
						position
						payout {
							id
							amount
							user {
								id
								username
							}
						}
						player {
							id
							username
						}
					}
					externalUrl
					id
				}
			}
		}
	`,
}

export const UPDATE_COMPETITION_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation UpdateCompetition($externalUrl: String, $id: ID!) {
			updateCompetition(
				input: { attributes: { externalUrl: $externalUrl }, id: $id }
			) {
				competition {
					competitionRecords {
						id
						xp
						position
						payout {
							id
							amount
							user {
								id
								username
							}
						}
						player {
							id
							username
						}
					}
					externalUrl
					id
				}
			}
		}
	`,
}

export const DELETE_COMPETITION_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation DeleteCompetition($id: ID!) {
			deleteCompetition(input: { id: $id }) {
				clientMutationId
				competition {
					competitionRecords {
						id
						xp
						position
						payout {
							id
							amount
							user {
								id
								username
							}
						}
						player {
							id
							username
						}
					}
					externalUrl
					id
				}
			}
		}
	`,
}

export const CREATE_COMPETITION_RECORD_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation CreateCompetitionRecord(
			$xp: BigInt!
			$position: BigInt!
			$playerId: ID!
			$competitionId: ID!
		) {
			createCompetitionRecord(
				input: {
					attributes: {
						xp: $xp
						position: $position
						playerId: $playerId
						competitionId: $competitionId
					}
				}
			) {
				competitionRecord {
					id
					position
					xp
					player {
						id
						username
					}
					payout {
						id
						amount
						user {
							id
							username
						}
					}
				}
			}
		}
	`,
}

export const UPDATE_COMPETITION_RECORD_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation UpdateCompetitionRecord(
			$xp: BigInt!
			$position: BigInt!
			$playerId: ID!
			$competitionId: ID!
			$id: ID!
		) {
			updateCompetitionRecord(
				input: {
					id: $id
					attributes: {
						xp: $xp
						position: $position
						playerId: $playerId
						competitionId: $competitionId
					}
				}
			) {
				competitionRecord {
					id
					position
					xp
					player {
						id
						username
					}
					payout {
						id
						amount
						user {
							id
							username
						}
					}
				}
			}
		}
	`,
}

export const DELETE_COMPETITION_RECORD_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation DeleteCompetitionRecord($id: ID!) {
			deleteCompetitionRecord(input: { id: $id }) {
				competitionRecord {
					id
					position
					xp
					player {
						id
						username
					}
					payout {
						id
						amount
						user {
							id
							username
						}
					}
				}
			}
		}
	`,
}

export const CREATE_PAYOUT_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation CreatePayout(
			$amount: Int!
			$paidById: ID!
			$competitionRecordId: ID!
		) {
			createPayout(
				input: {
					attributes: {
						amount: $amount
						paidById: $paidById
						competitionRecordId: $competitionRecordId
					}
				}
			) {
				payout {
					id
					amount
					user {
						id
						username
					}
				}
			}
		}
	`,
}

export const UPDATE_PAYOUT_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation UpdatePayout(
			$amount: Int!
			$paidById: ID!
			$competitionRecordId: ID!
			$id: ID!
		) {
			updatePayout(
				input: {
					id: $id
					attributes: {
						amount: $amount
						paidById: $paidById
						competitionRecordId: $competitionRecordId
					}
				}
			) {
				payout {
					id
					amount
					user {
						id
						username
					}
				}
			}
		}
	`,
}

export const DELETE_PAYOUT_MUTATION: IRequest = {
	type: MUTATION_OPERATION,
	query: gql`
		mutation DeletePayout($id: ID!) {
			deletePayout(input: { id: $id }) {
				payout {
					id
					amount
					user {
						id
						username
					}
				}
			}
		}
	`,
}

export const COMPETITIONS_QUERY: IRequest = {
	type: QUERY_OPERATION,
	query: gql`
		query Competitions(
			$externalUrlContains: String
			$order: OrderEnum
			$orderBy: CompetitionOrderEnum
			$first: Int
			$skip: Int
		) {
			competitions(
				filter: { externalUrlContains: $externalUrlContains }
				order: { order: $order, orderBy: $orderBy }
				first: $first
				skip: $skip
			) {
				competitionRecords {
					payout {
						id
						amount
						user {
							id
							username
						}
					}
					player {
						id
						username
					}
					position
					xp
					id
				}
				externalUrl
				id
				createdAt
			}
		}
	`,
}

export const COMPETITION_RECORDS_QUERY: IRequest = {
	type: QUERY_OPERATION,
	query: gql`
		query CompetitionRecords(
			$startPosition: Int
			$endPosition: Int
			$startXp: Int
			$endXp: Int
			$first: Int
			$skip: Int
			$competitionId: ID
			$order: OrderEnum
			$orderBy: CompetitionRecordOrderEnum
		) {
			competitionRecords(
				filter: {
					startPosition: $startPosition
					endPosition: $endPosition
					startXp: $startXp
					endXp: $endXp
				}
				order: { order: $order, orderBy: $orderBy }
				first: $first
				skip: $skip
				competitionId: $competitionId
			) {
				id
				payout {
					id
					amount
					user {
						id
						username
					}
				}
				player {
					id
					username
				}
				position
				xp
			}
		}
	`,
}

export const COMPETITION_QUERY: IRequest = {
	type: QUERY_OPERATION,
	query: gql`
		query Competition($id: ID!) {
			competition(id: $id) {
				competitionRecords {
					id
					xp
					position
					payout {
						id
						amount
						user {
							id
							username
						}
					}
					player {
						id
						username
					}
				}
				externalUrl
				id
			}
		}
	`,
}
