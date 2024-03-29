import PokerHandRank from "./PokerHandRank";

class TwoPair extends PokerHandRank {
    makesHand(hand) {
        super.makesHand(hand);

        let bestPairRank = null;

        for (const rank of this.uniqueRanks) {
            let count = 0;

            this.cards.forEach((c) => {
                if (c.getRank().equals(rank)) count++;
            });

            if (count === 2) {
                if (bestPairRank == null) {
                    bestPairRank = rank;
                } else {
                    this.bestPair = bestPairRank;
                    this.secondPair = rank;
                    return true;
                }
            }
        }

        return false;
    }

    getHandCards() {
        return this.cards.filter(
            (c) =>
                c.getRank() === this.bestPair || c.getRank() === this.secondPair
        );
    }

    compareEqualTypeHand(hand) {
        if (this.bestPair.getValue() > hand.bestPair.getValue()) return 1;
        else if (this.bestPair.getValue() < hand.bestPair.getValue()) return -1;

        if (this.secondPair.getValue() > hand.secondPair.getValue()) return 1;
        else if (this.secondPair.getValue() < hand.secondPair.getValue())
            return -1;
        else return super.compareEqualTypeHand(hand);
    }

    getName() {
        return "Two Pair";
    }

    getDetailedName() {
        return "Two Pair (" + this.bestPair + ", " + this.secondPair + ")";
    }
}

export default TwoPair;
