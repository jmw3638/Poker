import Hand from "./Hand";
import Flush from "./poker_hand_ranks/Flush";
import FourOfAKind from "./poker_hand_ranks/FourOfAKind";
import FullHouse from "./poker_hand_ranks/FullHouse";
import HighCard from "./poker_hand_ranks/HighCard";
import Pair from "./poker_hand_ranks/Pair";
import Straight from "./poker_hand_ranks/Straight";
import StraightFlush from "./poker_hand_ranks/StraightFlush";
import ThreeOfAKind from "./poker_hand_ranks/ThreeOfAKind";
import TwoPair from "./poker_hand_ranks/TwoPair";

class PokerUtil {
    static getRankedHand(hand) {
        const handRanks = [
            new HighCard(0),
            new Pair(1),
            new TwoPair(2),
            new ThreeOfAKind(3),
            new Straight(4),
            new Flush(5),
            new FullHouse(6),
            new FourOfAKind(7),
            new StraightFlush(8),
        ];

        for (const rank of handRanks.sort(
            (a, b) => b.getHandTypeValue() - a.getHandTypeValue()
        )) {
            if (rank.makesHand(hand)) return rank;
        }

        return null;
    }

    static getBestHand(hands, board) {
        let rankedHands = [];
        for (const hand of hands) {
            if (!hand.getCards().length) continue;

            const combinedHand = new Hand(
                hand.getCards().concat(board.getCards())
            );

            rankedHands.push(this.getRankedHand(combinedHand));
        }

        if (!rankedHands.length) return null;

        let bestHand = rankedHands[0];
        for (let i = 1; i < rankedHands.length; i++) {
            const result = bestHand.compareHand(rankedHands[i]);
            if (result < 0) {
                bestHand = rankedHands[i];
            } else if (result === 0) {
                console.log("TIE");
            }
        }

        const boardRanked = this.getRankedHand(board);
        if (boardRanked != null && boardRanked.compareHand(bestHand) > 0) {
            console.log("BOARD WIN");
            bestHand = boardRanked;
        }

        return bestHand;
    }
}

export default PokerUtil;
