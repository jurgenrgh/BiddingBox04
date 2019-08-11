/*jshint esversion: 6 */
/**
 * @class Board Describes a single board in the boards[] array
 *  
 * @param {number} boardNbr  --- physical sequence number on the board 
 * @param {number} boardIx   --- logical index of the board = index in the boards array 
 * @param {string} sectionId --- letter id assigned by director
 * @param {string} tableId   --- numbering of the tables assigned by director
 */
class Board {
    constructor(boardNbr, boardIx, sectionId, tableId) {
        this.boardNbr = boardNbr;
        this.boardIx = boardIx;
        this.sectionId = sectionId;
        this.tableId = tableId;
        this.bids = [];
        this.nbrBids = 0;
    }
    /**
     * Get the dealer from the board number
     * @returns {number} index relative to bidOrder ["W", "N", "E", "S"];
     */
    get dealerIx() {
        var bIx = this.boardNbr;
        var dIx = bIx % 4;
        return dIx; 
    }
    /**
     * Get the vultnerability from the board number
     * @returns {number} index rel to vulOrder = ["None", "NS", "EW", "All"];
     */
    get vulIx() {
        var bIx = this.boardNbr - 1;
        var dIx = bIx % 4;
        vulIx = (Math.floor(bIx / 4) + dIx) % 4;
        return vulIx;
    }
    /**
     * @param bidIx is any index in the bids array
     * @returns bidderIx the index of bidder of that bid
     */
    bidderIx(bidIx){
        var dIx = this.dealerIx; //dealer index in [N,E,S,W] sequence
        var bIx = (dIx + bidIx) % 4;
        return bIx;
    }
    /**
     * @param bidIx is any index in the bids array
     * @returns roundIx the index of bidding round for that bid
     */
    roundIx(bidIx){
        var dIx = this.dealerIx; //dealer index in [N,E,S,W] sequence
        var bIx = dIx + bidIx;
        var rIx = Math.floor(bIx / 4);
        return rIx;
    }
    /**
     * Put new Bid into this.bids[this.nbrBids] and increment bid count this.nbrBids   
     */
    appendBid(){
        //(boardNbr, roundIx, bidderIx, tricks, suit, alert_by, alert_to)
        var bIx = this.bidderIx(this.nbrBids); //bidder
        var rIx = bIx % 4; //round
        //Arguments are (boardNbr, roundIx, bidderIx, tricks, suit, alert_by, alert_to)
        this.bids[this.nbrBids] = new Bid(this.boardNbr, rIx, bIx, 0, "none", "", "");
        this.nbrBids++;
    }
}
/**
* A Test Routine called by Button Trigger on the Player Page
* Output to console.log
*/
function boardClassTest(){
    var test = [];
    var boardNbr = 3;
    var boardIx = 0;
    var sectionId = "C";
    var tableId = 7; 
    var testBoard = new Board(boardNbr, boardIx, sectionId, tableId);
    var dIx = testBoard.dealerIx;
    var dName = bidOrder[dIx];
    var vIx = testBoard.vulIx;
    var vName = vulOrder[vIx];
    console.log("Board Class Test", "bN: " + testBoard.boardNbr, "bIx: " + testBoard.boardIx, "sect: " + testBoard.sectionId, "table: " + testBoard.tableId );
    console.log("Board Class Test", "dIx: " + dIx, "dName: " + dName, "vIx: " + vIx, "vName: " + vName);

    for(i = 0; i < 16; i++){
        test[i] = new Board( i+1, i, "A", 1 + i/4);

        console.log("Board Class Test", i, "bN: " + test[i].boardNbr, "bIx: " + test[i].boardIx, "sect: " + test[i].sectionId, "table: " + test[i].tableId );
        console.log("Board Class Test", i, "dIx: " + test[i].dealerIx, "dName: " + bidOrder[test[i].dealerIx], "vIx: " + test[i].vulIx, "vName: " + vulOrder[test[i].vulIx]);

        //(boardNbr, roundIx, bidderIx, tricks, suit, alert_by, alert_to)
        test[i].appendBid();
        console.log("initial bids", i,  test[i].bids[0].boardNbr, test[i].roundIx(0),
         test[i].bids[0].bidderIx, test[i].bids[0].tricks, test[i].bids[0].suit, test[i].bids[0].alert_by, test[i].bids[0].alert_to);
    }
}