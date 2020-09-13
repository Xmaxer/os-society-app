/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
    username: string;        // A valid username
    id: string;              // The unique ID of the user
    resetPassword: boolean;  // Whether the user needs a password reset or not
}

export interface Login_login {
    token: string;           // A valid token
    user: Login_login_user;  // A valid user
}

export interface Login {
    login: Login_login | null;  // Login with valid credentials, returns a valid token if successful.
}

export interface LoginVariables {
    username: string;
    password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Logout
// ====================================================

export interface Logout_logout {
    success: boolean;  // True if logged out of current session
}

export interface Logout {
    logout: Logout_logout | null;  // Logout of the current session (Invalidates token)
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Authenticated
// ====================================================

export interface Authenticated_isAuthenticated {
    username: string;        // A valid username
    id: string;              // The unique ID of the user
    resetPassword: boolean;  // Whether the user needs a password reset or not
}

export interface Authenticated {
    isAuthenticated: Authenticated_isAuthenticated | null;  // Checks whether the login you're authenticated or not
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Players
// ====================================================

export interface Players_players {
    id: string;               // The unique ID of the player
    username: string;         // A valid username
    previousNames: string[];  // Any previous names this player had
    rank: number;             // A valid rank number
    createdAt: any;           // The date this player record was created
    updatedAt: any;           // The date this player record was updated
    comment: string | null;   // Optional extra comments
    joinDate: any;            // A valid non-future join date
}

export interface Players {
    players: Players_players[];  // Returns a list of players
    totalPlayers: number;        // Counts the total number of players
}

export interface PlayersVariables {
    order?: OrderEnum | null;
    orderBy?: PlayerOrderEnum | null;
    usernameContains?: string | null;
    previousNameContains?: string | null;
    usernameOrPreviousNameContains?: string | null;
    first?: number | null;
    skip?: number | null;
    rankContains?: number[] | null;
    startJoinDate?: any | null;
    endJoinDate?: any | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePlayer
// ====================================================

export interface CreatePlayer_createPlayer_player {
    username: string;         // A valid username
    id: string;               // The unique ID of the player
    joinDate: any;            // A valid non-future join date
    rank: number;             // A valid rank number
    comment: string | null;   // Optional extra comments
    previousNames: string[];  // Any previous names this player had
    createdAt: any;           // The date this player record was created
    updatedAt: any;           // The date this player record was updated
}

export interface CreatePlayer_createPlayer {
    player: CreatePlayer_createPlayer_player;
}

export interface CreatePlayer {
    createPlayer: CreatePlayer_createPlayer | null;
}

export interface CreatePlayerVariables {
    username: string;
    joinDate: any;
    rank: number;
    comment?: string | null;
    previousNames?: string[] | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePlayer
// ====================================================

export interface DeletePlayer_deletePlayer_player {
    username: string;         // A valid username
    id: string;               // The unique ID of the player
    comment: string | null;   // Optional extra comments
    rank: number;             // A valid rank number
    previousNames: string[];  // Any previous names this player had
    joinDate: any;            // A valid non-future join date
    createdAt: any;           // The date this player record was created
    updatedAt: any;           // The date this player record was updated
}

export interface DeletePlayer_deletePlayer {
    player: DeletePlayer_deletePlayer_player;
}

export interface DeletePlayer {
    deletePlayer: DeletePlayer_deletePlayer | null;
}

export interface DeletePlayerVariables {
    id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePlayer
// ====================================================

export interface UpdatePlayer_updatePlayer_player {
    username: string;         // A valid username
    id: string;               // The unique ID of the player
    joinDate: any;            // A valid non-future join date
    rank: number;             // A valid rank number
    comment: string | null;   // Optional extra comments
    previousNames: string[];  // Any previous names this player had
    createdAt: any;           // The date this player record was created
    updatedAt: any;           // The date this player record was updated
}

export interface UpdatePlayer_updatePlayer {
    player: UpdatePlayer_updatePlayer_player;
}

export interface UpdatePlayer {
    updatePlayer: UpdatePlayer_updatePlayer | null;
}

export interface UpdatePlayerVariables {
    username: string;
    joinDate: any;
    rank: number;
    comment?: string | null;
    previousNames?: string[] | null;
    id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetPassword
// ====================================================

export interface SetPassword_updateUser_user {
    id: string;              // The unique ID of the user
    username: string;        // A valid username
    resetPassword: boolean;  // Whether the user needs a password reset or not
}

export interface SetPassword_updateUser {
    user: SetPassword_updateUser_user;
}

export interface SetPassword {
    updateUser: SetPassword_updateUser | null;
}

export interface SetPasswordVariables {
    id: string;
    password: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCompetition
// ====================================================

export interface CreateCompetition_createCompetition_competition_competitionRecords_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface CreateCompetition_createCompetition_competition_competitionRecords_payout {
    id: string;                                                                            // The unique ID of the payout
    amount: any;                                                                           // The amount paid out
    user: CreateCompetition_createCompetition_competition_competitionRecords_payout_user;  // The user that paid it
}

export interface CreateCompetition_createCompetition_competition_competitionRecords_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface CreateCompetition_createCompetition_competition_competitionRecords {
    id: string;                                                                                // The unique ID of the competition
    xp: any;                                                                                   // The XP gained
    position: number;                                                                          // The ranking within the competition
    payout: CreateCompetition_createCompetition_competition_competitionRecords_payout | null;  // Gets a specific payout for the competition record
    player: CreateCompetition_createCompetition_competition_competitionRecords_player;         // The associated player
}

export interface CreateCompetition_createCompetition_competition {
    competitionRecords: CreateCompetition_createCompetition_competition_competitionRecords[];  // Returns a list of competition records belonging to the object
    externalUrl: string | null;                                                                // The external competition URL
    id: string;                                                                                // The unique ID of the competition
}

export interface CreateCompetition_createCompetition {
    competition: CreateCompetition_createCompetition_competition;
}

export interface CreateCompetition {
    createCompetition: CreateCompetition_createCompetition | null;
}

export interface CreateCompetitionVariables {
    externalUrl?: string | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCompetition
// ====================================================

export interface UpdateCompetition_updateCompetition_competition_competitionRecords_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface UpdateCompetition_updateCompetition_competition_competitionRecords_payout {
    id: string;                                                                            // The unique ID of the payout
    amount: any;                                                                           // The amount paid out
    user: UpdateCompetition_updateCompetition_competition_competitionRecords_payout_user;  // The user that paid it
}

export interface UpdateCompetition_updateCompetition_competition_competitionRecords_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface UpdateCompetition_updateCompetition_competition_competitionRecords {
    id: string;                                                                                // The unique ID of the competition
    xp: any;                                                                                   // The XP gained
    position: number;                                                                          // The ranking within the competition
    payout: UpdateCompetition_updateCompetition_competition_competitionRecords_payout | null;  // Gets a specific payout for the competition record
    player: UpdateCompetition_updateCompetition_competition_competitionRecords_player;         // The associated player
}

export interface UpdateCompetition_updateCompetition_competition {
    competitionRecords: UpdateCompetition_updateCompetition_competition_competitionRecords[];  // Returns a list of competition records belonging to the object
    externalUrl: string | null;                                                                // The external competition URL
    id: string;                                                                                // The unique ID of the competition
}

export interface UpdateCompetition_updateCompetition {
    competition: UpdateCompetition_updateCompetition_competition;
}

export interface UpdateCompetition {
    updateCompetition: UpdateCompetition_updateCompetition | null;
}

export interface UpdateCompetitionVariables {
    externalUrl?: string | null;
    id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCompetition
// ====================================================

export interface DeleteCompetition_deleteCompetition_competition_competitionRecords_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface DeleteCompetition_deleteCompetition_competition_competitionRecords_payout {
    id: string;                                                                            // The unique ID of the payout
    amount: any;                                                                           // The amount paid out
    user: DeleteCompetition_deleteCompetition_competition_competitionRecords_payout_user;  // The user that paid it
}

export interface DeleteCompetition_deleteCompetition_competition_competitionRecords_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface DeleteCompetition_deleteCompetition_competition_competitionRecords {
    id: string;                                                                                // The unique ID of the competition
    xp: any;                                                                                   // The XP gained
    position: number;                                                                          // The ranking within the competition
    payout: DeleteCompetition_deleteCompetition_competition_competitionRecords_payout | null;  // Gets a specific payout for the competition record
    player: DeleteCompetition_deleteCompetition_competition_competitionRecords_player;         // The associated player
}

export interface DeleteCompetition_deleteCompetition_competition {
    competitionRecords: DeleteCompetition_deleteCompetition_competition_competitionRecords[];  // Returns a list of competition records belonging to the object
    externalUrl: string | null;                                                                // The external competition URL
    id: string;                                                                                // The unique ID of the competition
}

export interface DeleteCompetition_deleteCompetition {
    clientMutationId: string | null;  // A unique identifier for the client performing the mutation.
    competition: DeleteCompetition_deleteCompetition_competition;
}

export interface DeleteCompetition {
    deleteCompetition: DeleteCompetition_deleteCompetition | null;
}

export interface DeleteCompetitionVariables {
    id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCompetitionRecord
// ====================================================

export interface CreateCompetitionRecord_createCompetitionRecord_competitionRecord_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface CreateCompetitionRecord_createCompetitionRecord_competitionRecord_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface CreateCompetitionRecord_createCompetitionRecord_competitionRecord_payout {
    id: string;                                                                           // The unique ID of the payout
    amount: any;                                                                          // The amount paid out
    user: CreateCompetitionRecord_createCompetitionRecord_competitionRecord_payout_user;  // The user that paid it
}

export interface CreateCompetitionRecord_createCompetitionRecord_competitionRecord {
    id: string;                                                                               // The unique ID of the competition
    position: number;                                                                         // The ranking within the competition
    xp: any;                                                                                  // The XP gained
    player: CreateCompetitionRecord_createCompetitionRecord_competitionRecord_player;         // The associated player
    payout: CreateCompetitionRecord_createCompetitionRecord_competitionRecord_payout | null;  // Gets a specific payout for the competition record
}

export interface CreateCompetitionRecord_createCompetitionRecord {
    competitionRecord: CreateCompetitionRecord_createCompetitionRecord_competitionRecord;
}

export interface CreateCompetitionRecord {
    createCompetitionRecord: CreateCompetitionRecord_createCompetitionRecord | null;
}

export interface CreateCompetitionRecordVariables {
    xp: any;
    position: any;
    playerId: string;
    competitionId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateCompetitionRecord
// ====================================================

export interface UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_payout {
    id: string;                                                                           // The unique ID of the payout
    amount: any;                                                                          // The amount paid out
    user: UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_payout_user;  // The user that paid it
}

export interface UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord {
    id: string;                                                                               // The unique ID of the competition
    position: number;                                                                         // The ranking within the competition
    xp: any;                                                                                  // The XP gained
    player: UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_player;         // The associated player
    payout: UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord_payout | null;  // Gets a specific payout for the competition record
}

export interface UpdateCompetitionRecord_updateCompetitionRecord {
    competitionRecord: UpdateCompetitionRecord_updateCompetitionRecord_competitionRecord;
}

export interface UpdateCompetitionRecord {
    updateCompetitionRecord: UpdateCompetitionRecord_updateCompetitionRecord | null;
}

export interface UpdateCompetitionRecordVariables {
    xp: any;
    position: any;
    playerId: string;
    competitionId: string;
    id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteCompetitionRecord
// ====================================================

export interface DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_payout {
    id: string;                                                                           // The unique ID of the payout
    amount: any;                                                                          // The amount paid out
    user: DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_payout_user;  // The user that paid it
}

export interface DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord {
    id: string;                                                                               // The unique ID of the competition
    position: number;                                                                         // The ranking within the competition
    xp: any;                                                                                  // The XP gained
    player: DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_player;         // The associated player
    payout: DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord_payout | null;  // Gets a specific payout for the competition record
}

export interface DeleteCompetitionRecord_deleteCompetitionRecord {
    competitionRecord: DeleteCompetitionRecord_deleteCompetitionRecord_competitionRecord;
}

export interface DeleteCompetitionRecord {
    deleteCompetitionRecord: DeleteCompetitionRecord_deleteCompetitionRecord | null;
}

export interface DeleteCompetitionRecordVariables {
    id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreatePayout
// ====================================================

export interface CreatePayout_createPayout_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface CreatePayout_createPayout_payout {
    id: string;                                   // The unique ID of the payout
    amount: any;                                  // The amount paid out
    user: CreatePayout_createPayout_payout_user;  // The user that paid it
}

export interface CreatePayout_createPayout {
    payout: CreatePayout_createPayout_payout;
}

export interface CreatePayout {
    createPayout: CreatePayout_createPayout | null;
}

export interface CreatePayoutVariables {
    amount: number;
    paidById: string;
    competitionRecordId: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdatePayout
// ====================================================

export interface UpdatePayout_updatePayout_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface UpdatePayout_updatePayout_payout {
    id: string;                                   // The unique ID of the payout
    amount: any;                                  // The amount paid out
    user: UpdatePayout_updatePayout_payout_user;  // The user that paid it
}

export interface UpdatePayout_updatePayout {
    payout: UpdatePayout_updatePayout_payout;
}

export interface UpdatePayout {
    updatePayout: UpdatePayout_updatePayout | null;
}

export interface UpdatePayoutVariables {
    amount: number;
    paidById: string;
    competitionRecordId: string;
    id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeletePayout
// ====================================================

export interface DeletePayout_deletePayout_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface DeletePayout_deletePayout_payout {
    id: string;                                   // The unique ID of the payout
    amount: any;                                  // The amount paid out
    user: DeletePayout_deletePayout_payout_user;  // The user that paid it
}

export interface DeletePayout_deletePayout {
    payout: DeletePayout_deletePayout_payout;
}

export interface DeletePayout {
    deletePayout: DeletePayout_deletePayout | null;
}

export interface DeletePayoutVariables {
    id: string;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Competitions
// ====================================================

export interface Competitions_competitions_competitionRecords_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface Competitions_competitions_competitionRecords_payout {
    id: string;                                                      // The unique ID of the payout
    amount: any;                                                     // The amount paid out
    user: Competitions_competitions_competitionRecords_payout_user;  // The user that paid it
}

export interface Competitions_competitions_competitionRecords_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface Competitions_competitions_competitionRecords {
    payout: Competitions_competitions_competitionRecords_payout | null;  // Gets a specific payout for the competition record
    player: Competitions_competitions_competitionRecords_player;         // The associated player
    position: number;                                                    // The ranking within the competition
    xp: any;                                                             // The XP gained
    id: string;                                                          // The unique ID of the competition
}

export interface Competitions_competitions {
    competitionRecords: Competitions_competitions_competitionRecords[];  // Returns a list of competition records belonging to the object
    externalUrl: string | null;                                          // The external competition URL
    id: string;                                                          // The unique ID of the competition
    createdAt: string | null;                                            // The date time the competition was created at
}

export interface Competitions {
    competitions: Competitions_competitions[];  // Returns a list of competitions
}

export interface CompetitionsVariables {
    externalUrlContains?: string | null;
    order?: OrderEnum | null;
    orderBy?: CompetitionOrderEnum | null;
    first?: number | null;
    skip?: number | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CompetitionRecords
// ====================================================

export interface CompetitionRecords_competitionRecords_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface CompetitionRecords_competitionRecords_payout {
    id: string;                                               // The unique ID of the payout
    amount: any;                                              // The amount paid out
    user: CompetitionRecords_competitionRecords_payout_user;  // The user that paid it
}

export interface CompetitionRecords_competitionRecords_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface CompetitionRecords_competitionRecords {
    id: string;                                                   // The unique ID of the competition
    payout: CompetitionRecords_competitionRecords_payout | null;  // Gets a specific payout for the competition record
    player: CompetitionRecords_competitionRecords_player;         // The associated player
    position: number;                                             // The ranking within the competition
    xp: any;                                                      // The XP gained
}

export interface CompetitionRecords {
    competitionRecords: CompetitionRecords_competitionRecords[];  // Returns a list of competition records belonging to the object
}

export interface CompetitionRecordsVariables {
    startPosition?: number | null;
    endPosition?: number | null;
    startXp?: number | null;
    endXp?: number | null;
    first?: number | null;
    skip?: number | null;
    competitionId?: string | null;
    order?: OrderEnum | null;
    orderBy?: CompetitionRecordOrderEnum | null;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Competition
// ====================================================

export interface Competition_competition_competitionRecords_payout_user {
    id: string;        // The unique ID of the user
    username: string;  // A valid username
}

export interface Competition_competition_competitionRecords_payout {
    id: string;                                                    // The unique ID of the payout
    amount: any;                                                   // The amount paid out
    user: Competition_competition_competitionRecords_payout_user;  // The user that paid it
}

export interface Competition_competition_competitionRecords_player {
    id: string;        // The unique ID of the player
    username: string;  // A valid username
}

export interface Competition_competition_competitionRecords {
    id: string;                                                        // The unique ID of the competition
    xp: any;                                                           // The XP gained
    position: number;                                                  // The ranking within the competition
    payout: Competition_competition_competitionRecords_payout | null;  // Gets a specific payout for the competition record
    player: Competition_competition_competitionRecords_player;         // The associated player
}

export interface Competition_competition {
    competitionRecords: Competition_competition_competitionRecords[];  // Returns a list of competition records belonging to the object
    externalUrl: string | null;                                        // The external competition URL
    id: string;                                                        // The unique ID of the competition
}

export interface Competition {
    competition: Competition_competition | null;  // Gets a specific competition object
}

export interface CompetitionVariables {
    id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

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

export enum CompetitionOrderEnum {
    CREATED_AT = "CREATED_AT",
}

export enum CompetitionRecordOrderEnum {
    POSITION = "POSITION",
    XP = "XP",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
