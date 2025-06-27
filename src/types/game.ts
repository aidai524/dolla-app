export enum GameStatus {
  QUEUED = "queue",
  ACTIVE = "active",
  PROGRESS = "progressing",
  CLOSED = "closed",
  COMPLETED = "completed",
  CANCELLED = "cancelled"
}

export type GameStatusType = keyof typeof GameStatus;
