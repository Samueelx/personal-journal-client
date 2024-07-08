export interface ErrorResponse {
    message: string
}

export interface JournalEntry {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string;
  }