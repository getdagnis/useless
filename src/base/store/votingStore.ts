import { create } from "zustand";

// Zustand Next.js guide: https://zustand.docs.pmnd.rs/guides/nextjs
// Zustand docs: https://github.com/pmndrs/zustand/tree/main/docs

interface VotingState {
	votes: Record<string, number>; // A map of voteable items and their vote counts
	vote: (id: string) => void; // Function to cast a vote
}

export const useVotingStore = create<VotingState>(
	(
		set: (arg0: (state: { votes: { [x: string]: any } }) => { votes: { [x: string]: any } }) => any
	) => ({
		votes: {},
		vote: (id: string | number) =>
			set((state: { votes: { [x: string]: any } }) => ({
				votes: {
					...state.votes,
					[id]: (state.votes[id] || 0) + 1,
				},
			})),
	})
);
