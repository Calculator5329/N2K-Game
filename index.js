let mouseX = 1
let mouseY = 1
function printMousePos(event) {
    mouseX = event.clientX
    mouseY = event.clientY
}

document.addEventListener("click", printMousePos);


let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext('2d')

const GAME_WIDTH = 1800;
const GAME_HEIGHT = 900;

let Default_Font = "40px Times New Roman"
let Default_Color = "Black"

function drawText(text, x, y, color, font1) {
    ctx.fillStyle = color;
    ctx.font = font1
    ctx.fillText(text, x, y)
}
function drawLine(x, y, z, a, color, lWidth = 1) {
    ctx.strokeStyle = color
    ctx.lineWidth = lWidth
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(z, a);
    ctx.stroke();
}
function Stroke_Rect(x, y, width, height, color, a = 0, b = 1) {
    drawLine(x - a, y, x + width + a, y, color, b)
    drawLine(x - a, y + height, x + width + a, y + height, color, b)
    drawLine(x, y + height + a, x, y - a, color, b)
    drawLine(x + width, y - a, x + width, y + height + a, color, b)
}
function rect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height)
}
function rounded_rect(x, y, width, height, color, a = 0, b = 1) {
    ctx.fillStyle = color;
    ctx.fillRect(x + b, y + b, width - b * 2, height - b * 2)
    drawLine(x - a, y, x + width + a, y, color, b * 2)
    drawLine(x - a, y + height, x + width + a, y + height, color, b * 2)
    drawLine(x, y + height + a, x, y - a, color, b * 2)
    drawLine(x + width, y - a, x + width, y + height + a, color, b * 2)
}
function circle(x, y, radius, color, z) {
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.lineWidth = z
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}
function flipCoin() {
    if (Math.random() > 0.5) {
        return true
    }
    else {
        return false
    }
}
function randNum(x, y) {
    return Math.random() * (y - x) + x
}
function randInt(x, y) {
    return Math.round(Math.random() * (y - x) + x)
}
function pickNum(x, y) {
    if (Math.random() < 0.5) {
        return y
    }
    else {
        return x
    }
}
function makeArc(x, y, radius, d1, d2, color, z) {
    ctx.beginPath();
    ctx.strokeStyle = color
    ctx.lineWidth = z
    ctx.arc(x, y, radius, d1, d2);
    ctx.stroke();
}
function listAverage(list) {
    let a = 0
    let sum = 0
    while (a < (list.length - 1)) {
        sum += list[a]
        a += 1
    }
    if (list.length === 1) {
        return list[0]
    }
    else {
        return (sum / (list.length - 1))
    }
}
function Value_In_Rect(x, y, rect_x, rect_y, rect_width, rect_height) {
    let value = false
    if (x > rect_x) {
        if (x < rect_x + rect_width) {
            if (y > rect_y) {
                if (y < rect_y + rect_height) {
                    value = true
                }
            }
        }
    }
    return value
}
function Default_Text(text, x, y) {
    drawText(text, x, y, Default_Color, Default_Font)
}
function Paragraph_Text(text, max_letters) {
    let res = text.split(" ");
    let i = 0
    let letter_counter = 0
    let return_list = []
    let cumulative_strings = ""
    while (i < res.length) {
        letter_counter += res[i].length
        if (letter_counter > max_letters) {
            if (cumulative_strings != "") {
                return_list.push(cumulative_strings)
            }
            cumulative_strings = ""
            letter_counter = res[i].length
        }
        cumulative_strings += res[i] + " "
        i += 1
    }
    return_list.push(cumulative_strings)
    return_list.push("")
    return return_list
}
function amount_of_x_in_list(x, list) {
    let i = 0
    let count = 0
    while (i < list.length) {
        if (list[i] == x) {
            count += 1
        }
        i += 1
    }
    return count
}
function makeButton(x, y, a, b) {
    if (mouseX > x && mouseY > y) {
        if (mouseX < a && mouseY < b) {
            return true
        }
        else {
            return false
        }
    }
    else {
        return false
    }
}
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}
function makeBoard(x, y, size, board_numbers, interactive = false) {
    let i = 0
    while (i < 7) {
        drawLine(x + size * i, y, x + size * i, y + 6 * size, "black", 2)
        drawLine(x, y + size * i, x + 6 * size, y + size * i, "black", 2)
        i++
    }
    i = 0
    let j = 0
    while (i < 6) {
        while (j < 6) {
            drawText(board_numbers[i * 6 + j], x + size / 5 + j * size, y + size / 1.6 + i * size, "black", "40px times new roman")
            j += 1
        }
        i += 1
        j = 0
    }
    i = 0
    j = 0

    if (interactive) {
        if (mouseX > x && mouseX < x + size * 6) {
            if (mouseY > y && mouseY < y + size * 6) {
                if (!roundDone) {
                    numbersCompleted[Math.floor((mouseX - x) / size) + Math.floor((mouseY - y) / size) * 6] *= -1
                    timesList.push(Math.round(timerNum * 10 / 3) / 100)
                    mouseX = 0
                    mouseY = 0
                }
            }
        }

        while (i < 36) {
            if (numbersCompleted[i] == 1) {
                rect((i - Math.floor(i / 6) * 6) * size + x + 1, Math.floor(i / 6) * size + y + 1, size - 2, size - 2, "#00FFFFAF")
            }
            i += 1
        }
        i = 0
    }
}
function generateBoard(range, randomTF) {
    let i = 0
    let returnList = []
    let next_num = 0
    let patternBoardCounter = Math.round(range / 36 - 0.5)
    if (randomTF) {
        while (i < 36) {
            next_num = Math.round(Math.random() * range + 0.5)
            while (amount_of_x_in_list(next_num, returnList) > 0) {
                next_num = Math.round(Math.random() * range + 0.5)
            }
            returnList.push(next_num)
            i++
        }
    }
    else {
        while (i < 36) {
            returnList.push((i + 1) * patternBoardCounter)
            i++
        }
    }
    returnList.sort(function (a, b) { return a - b })
    return returnList
}
function bot(dice1, dice2, dice3, ptop) {
    let current_answer = 0
    let p1 = Math.round(Math.random() * ptop)
    let p2 = Math.round(Math.random() * ptop)
    let p3 = Math.round(Math.random() * ptop)
    let order_chooser = Math.round(6 * Math.random() + 0.5)
    let tempvar1 = dice1
    let tempvar2 = dice2
    let tempvar3 = dice3
    let o1 = ""
    let o2 = ""
    let equation_chooser = Math.round(16 * Math.random() + 0.5)

    //Choosing Order
    {
        if (order_chooser == 2) {
            dice1 = tempvar2
            dice2 = tempvar1
        }
        if (order_chooser == 3) {
            dice1 = tempvar3
            dice3 = tempvar1
        }
        if (order_chooser == 4) {
            dice2 = tempvar3
            dice3 = tempvar2
        }
        if (order_chooser == 5) {
            dice1 = tempvar3
            dice3 = tempvar2
            dice2 = tempvar1
        }
        if (order_chooser == 6) {
            dice1 = tempvar2
            dice3 = tempvar1
            dice2 = tempvar3
        }
    }
    //Choosing Equations
    {

        //Equations using +
        if (equation_chooser == 1) {
            current_answer = Math.pow(dice1, p1) + Math.pow(dice2, p2) + Math.pow(dice3, p3)
            o1 = "+"
            o2 = "+"
        }
        if (equation_chooser == 2) {
            current_answer = Math.pow(dice1, p1) + Math.pow(dice2, p2) - Math.pow(dice3, p3)
            o1 = "+"
            o2 = "-"
        }
        if (equation_chooser == 3) {
            current_answer = Math.pow(dice1, p1) + Math.pow(dice2, p2) * Math.pow(dice3, p3)
            o1 = "+"
            o2 = "*"
        }
        if (equation_chooser == 4) {
            current_answer = Math.pow(dice1, p1) + Math.pow(dice2, p2) / Math.pow(dice3, p3)
            o1 = "+"
            o2 = "/"
        }
        //Equations using -
        if (equation_chooser == 5) {
            current_answer = Math.pow(dice1, p1) - Math.pow(dice2, p2) + Math.pow(dice3, p3)
            o1 = "-"
            o2 = "+"
        }
        if (equation_chooser == 6) {
            current_answer = Math.pow(dice1, p1) - Math.pow(dice2, p2) - Math.pow(dice3, p3)
            o1 = "-"
            o2 = "-"
        }
        if (equation_chooser == 7) {
            current_answer = Math.pow(dice1, p1) - Math.pow(dice2, p2) * Math.pow(dice3, p3)
            o1 = "-"
            o2 = "*"
        }
        if (equation_chooser == 8) {
            current_answer = Math.pow(dice1, p1) - Math.pow(dice2, p2) / Math.pow(dice3, p3)
            o1 = "-"
            o2 = "/"
        }
        //Equations using *
        if (equation_chooser == 9) {
            current_answer = Math.pow(dice1, p1) * Math.pow(dice2, p2) + Math.pow(dice3, p3)
            o1 = "*"
            o2 = "+"
        }
        if (equation_chooser == 10) {
            current_answer = Math.pow(dice1, p1) * Math.pow(dice2, p2) - Math.pow(dice3, p3)
            o1 = "*"
            o2 = "-"
        }
        if (equation_chooser == 11) {
            current_answer = Math.pow(dice1, p1) * Math.pow(dice2, p2) * Math.pow(dice3, p3)
            o1 = "*"
            o2 = "*"
        }
        if (equation_chooser == 12) {
            current_answer = Math.pow(dice1, p1) * Math.pow(dice2, p2) / Math.pow(dice3, p3)
            o1 = "*"
            o2 = "/"
        }
        //Equations using /
        if (equation_chooser == 13) {
            current_answer = Math.pow(dice1, p1) / Math.pow(dice2, p2) + Math.pow(dice3, p3)
            o1 = "/"
            o2 = "+"
        }
        if (equation_chooser == 14) {
            current_answer = Math.pow(dice1, p1) / Math.pow(dice2, p2) - Math.pow(dice3, p3)
            o1 = "/"
            o2 = "-"
        }
        if (equation_chooser == 15) {
            current_answer = Math.pow(dice1, p1) / Math.pow(dice2, p2) * Math.pow(dice3, p3)
            o1 = "/"
            o2 = "*"
        }
        if (equation_chooser == 16) {
            current_answer = Math.pow(dice1, p1) / Math.pow(dice2, p2) / Math.pow(dice3, p3)
            o1 = "/"
            o2 = "/"
        }

    }

    if (amount_of_x_in_list(current_answer, boardNums) == 1) {
        if (amount_of_x_in_list(current_answer, bot_numbers_gotten) == 0) {
            bot_numbers_gotten.push(current_answer)
            botNumbersCompleted[boardNums.indexOf(current_answer)] = 1
            equations.push(dice1 + "^" + p1.toString() + " " + o1 + " " + dice2.toString() + "^" + p2.toString() + " " + o2 + " " + dice3.toString() + "^" + p3.toString() + " = " + current_answer.toString())
        }
        /*
        bot_numbers_gotten.push(current_answer)
        botNumbersCompleted[boardNums.indexOf(current_answer)] = 1
        */


    }
    //console.log(current_answer)

}
function baseNumGenerator(boardNums, theDice) {
    let dicePowers = []
    //aprox 1mil limit
    let powRange = [20, 1, 20, 13, 10, 9, 10, 8, 7, 7, 7, 7, 6, 6, 6, 7, 6, 8, 5, 7]

    let baseNums = []

    while (j < theDice.length) {
        dicePowers.push([])
        while (i < powRange[theDice[j]]) {
            dicePowers[j].push(Math.pow(theDice[j], i))
            i += 1
        }
        j += 1
        i = 0
    }

    i = 0
    j = 0

    //console.log(dicePowers)

    while (j < dicePowers.length) {
        baseNums.push([])
        while (i < dicePowers[j].length) {
            if (dicePowers[j][i] < boardNums[35] * 1.05) {
                baseNums[j].push(dicePowers[j][i])
            }
            i += 1
        }
        i = 0
        j += 1
    }

    i = 0
    j = 0

    return (baseNums)
    // boardNums[35] - baseNums[0][baseNums.length-1]
}
function equationsTwoVars(v1, v2, powerLimit1, powerLimit2, result) {
    let stringEquation = ""
    let p1 = 0
    let p2 = 0
    let n1 = 0
    let n2 = 0
    let i = 0
    let resultFound = false
    while (i < (powerLimit1 * powerLimit2) && !resultFound) {
        n1 = Math.pow(v1, p1)
        n2 = Math.pow(v2, p2)
        if (n1 + n2 == result) {
            stringEquation = v1 + "^" + p1 + " + " + v2 + "^" + p2
            return [true, stringEquation]
            resultFound = true
        }
        if (n1 - n2 == result) {
            stringEquation = v1 + "^" + p1 + " - " + v2 + "^" + p2
            return [true, stringEquation]
            resultFound = true
        }
        if (n1 * n2 == result) {
            stringEquation = v1 + "^" + p1 + " * " + v2 + "^" + p2
            return [true, stringEquation]
            resultFound = true
        }
        if (n1 / n2 == result) {
            stringEquation = v1 + "^" + p1 + " / " + v2 + "^" + p2
            return [true, stringEquation]
            resultFound = true
        }
        i += 1
        if (p1 < powerLimit1) {
            p1 += 1
        }
        else {
            p2 += 1
            p1 = 0
        }
    }
    i = 0
    if (resultFound == false) {
        return ([false])
    }
}
function bot2(boardNums, theDice, baseNums, diceNum, enableCounter = true) {
    //Calculating distance between baseNums and numbers on the board and trying to get it with the other two numbers

    //Calculating the values to use for the two variable equations

    let n2 = theDice[1]
    let n3 = theDice[2]

    if (diceNum == 1) {
        n2 = theDice[0]
        n3 = theDice[2]
    }
    if (diceNum == 2) {
        n2 = theDice[0]
        n3 = theDice[1]
    }
    let powRange = [20, 1, 20, 13, 10, 9, 10, 8, 7, 7, 7, 7, 6, 6, 6, 7, 6, 8, 5, 7]
    let currentBoardNumber = 0
    let currentBaseNum = 0

    //Cycles through the base numbers

    if (bot_j < baseNums[diceNum].length) {

        //Adjusts the current base number from the back of the list to the front

        currentBaseNum = baseNums[diceNum][baseNums[diceNum].length - bot_j - 1]

        //Cycles through attempting to solve each number on the board            

        if (bot_i < 36) {

            //Adjusts current board number to solve

            currentBoardNumber = 35 - bot_i

            //If the current board number is greater than the current base number, execute the (base number) + (two variable combination) equation  

            if (boardNums[currentBoardNumber] >= currentBaseNum) {

                //If it is possible to get the current board number its trying to solve with the other two variables (equationsTwoVars)

                if (equationsTwoVars(n2, n3, powRange[n2], powRange[n3], (boardNums[currentBoardNumber] - currentBaseNum))[0]) {
                    //Old code:  console.log("Got " + boardNums[currentBoardNumber] + ": " + theDice[diceNum] + "^" + baseNums[diceNum].indexOf(currentBaseNum) + " + " + equationsTwoVars(n2, n3, powRange[n2], powRange[n3], (boardNums[currentBoardNumber] - currentBaseNum))[1])

                    //If this number has not already been gotten

                    if (amount_of_x_in_list(boardNums[currentBoardNumber], bot_numbers_gotten) == 0) {

                        //Add the board number to "numbers gotten" list

                        bot_numbers_gotten.push(boardNums[currentBoardNumber])

                        //Edit the list used to create the "knocked off" rectangles to display the board number that was solved

                        botNumbersCompleted[boardNums.indexOf(boardNums[currentBoardNumber])] = 1

                        //Add the equation used to equations list for later display

                        equations.push(theDice[diceNum] + "^" + baseNums[diceNum].indexOf(currentBaseNum) + " + " + equationsTwoVars(n2, n3, powRange[n2], powRange[n3], (boardNums[currentBoardNumber] - currentBaseNum))[1] + " = " + boardNums[currentBoardNumber])
                    }
                }
            }
            else {

                //If the current board number is not greater than the current base number, execute the (base number) - (two variable combination) equation  

                if (equationsTwoVars(n2, n3, powRange[n2], powRange[n3], (currentBaseNum - boardNums[currentBoardNumber]))[0]) {
                    //console.log("Got " + boardNums[currentBoardNumber] + ": " + theDice[diceNum] + "^" + baseNums[diceNum].indexOf(currentBaseNum) + " - (" + equationsTwoVars(n2, n3, powRange[n2], powRange[n3], (currentBaseNum - boardNums[currentBoardNumber]))[1] + ")")
                    if (amount_of_x_in_list(boardNums[currentBoardNumber], bot_numbers_gotten) == 0) {
                        bot_numbers_gotten.push(boardNums[currentBoardNumber])
                        botNumbersCompleted[boardNums.indexOf(boardNums[currentBoardNumber])] = 1
                        equations.push(theDice[diceNum] + "^" + baseNums[diceNum].indexOf(currentBaseNum) + " - (" + equationsTwoVars(n2, n3, powRange[n2], powRange[n3], (currentBaseNum - boardNums[currentBoardNumber]))[1] + ") = " + boardNums[currentBoardNumber])
                    }
                }
            }
        }
    }
    //}

    //If this bot is supposed to count i and j 

    if (enableCounter) {
        if (bot_i < 36) {
            bot_i += 1
        }
        else if (bot_j < baseNums[diceNum].length - 1) {
            bot_i = 0
            bot_j += 1
        }
        else {
            bot2done = true
        }
    }


}
function customBoardScreen() {
    if (errorScreen) {
        drawText("Error. Please restart program", 0, 400, "red", "150px Times New Roman")
    }


    rect(250, 150, 250, 155, "#00AAFFCF", 1)
    //RBoard 250, 150   500, 305
    if (makeButton(250, 150, 500, 305)) {
        randomBoard = true
        patternBoard = false
        customBoard = false
        range = Math.round(36 + Math.random() * 963)
    }
    rect(250, 325, 250, 155, "#00AAFFCF", 1)
    //PBoard 250, 325   500, 480
    if (makeButton(250, 325, 500, 480)) {
        randomBoard = false
        patternBoard = true
        customBoard = false

    }
    rect(250, 500, 250, 155, "#00AAFFCF", 1)
    //CBoard 250, 500,  500, 655
    if (makeButton(250, 500, 500, 655)) {
        randomBoard = false
        patternBoard = false
        customBoard = true
    }

    drawText("Random Board", 275, 230, "black", "32px Times New Roman")
    drawText("Pattern Board", 275, 405, "black", "32px Times New Roman")
    drawText("Custom Board", 275, 580, "black", "32px Times New Roman")

    rect(550, 350, 250, 100, "#6389C0DF")
    drawText("Board Range: " + range, 565, 410, "black", "30px Times New Roman")

    rect(550, 275, 250, 50, "#6389C0DF")
    //R Up 550, 275   800, 325
    if (makeButton(550, 275, 800, 325)) {
        if (range == 36) {
            range = 40
        }
        else {
            range += 10
        }
        mouseX = 0
        mouseY = 0
    }
    rect(550, 475, 250, 50, "#6389C0DF")
    //R Down 550, 475  800, 525
    if (makeButton(550, 475, 800, 525)) {
        range -= 10
        mouseX = 0
        mouseY = 0
    }
    rect(550, 235, 250, 25, "#6389C0DF")
    // R Up 100  550, 235  800, 260
    if (makeButton(550, 235, 800, 260)) {
        range += 100
        mouseX = 0
        mouseY = 0
    }
    rect(550, 540, 250, 25, "#6389C0DF")
    // R Down 100  550, 540  800, 565
    if (makeButton(550, 540, 800, 565)) {
        range -= 100
        mouseX = 0
        mouseY = 0
    }
    drawText("Range Up 10", 590, 310, "black", "24px Times New Roman")
    drawText("Range Down 10", 590, 510, "black", "24px Times New Roman")
    drawText("Up 100", 625, 252, "black", "20px Times New Roman")
    drawText("Down 100", 625, 558, "black", "20px Times New Roman")

    rect(1300, 150, 250, 155, "#00AAFFCF", 1)
    //RDice 1300, 150  1550, 305
    if (makeButton(1300, 150, 1550, 305)) {
        randomDice = true
        customDice = false
        fourDice = false
        theDice = [0, 0, 0]
        mouseX = 0
        mouseY = 0
    }
    rect(1300, 325, 250, 155, "#00AAFFCF", 1)
    //CDice 1300, 325  1550, 480
    if (makeButton(1300, 325, 1550, 480)) {
        randomDice = false
        customDice = true
        fourDice = false
        theDice = [0, 0, 0]
        mouseX = 0
        mouseY = 0
    }
    /*rect(1300, 500, 250, 155, "#00AAFFCF", 1)
    //FDice 1300, 500   1550, 655
    if (makeButton(1300, 500, 1550, 655)) {
        randomDice = false
        customDice = false
        fourDice = true
        theDice = [0, 0, 0]
        mouseX = 0
        mouseY = 0
    }
    */
    drawText("Random Dice", 1325, 230, "black", "32px Times New Roman")
    drawText("Custom Dice", 1325, 405, "black", "32px Times New Roman")
    //drawText("Four Dice", 1325, 580, "black", "32px Times New Roman")

    rect(1000, 350, 250, 100, "#6389C0DF")
    drawText("Dice Range: " + diceRange, 1015, 410, "black", "30px Times New Roman")

    rect(1000, 275, 250, 50, "#6389C0DF")
    //DR Up 1000, 275    1250, 325
    if (makeButton(1000, 275, 1250, 325)) {
        diceRange += 1
        mouseX = 0
        mouseY = 0
    }
    rect(1000, 475, 250, 50, "#6389C0DF")
    //DR Down 1000, 475   1250, 525
    if (makeButton(1000, 475, 1250, 525)) {
        diceRange -= 1
        mouseX = 0
        mouseY = 0
    }
    drawText("Range Up 1", 1040, 310, "black", "24px Times New Roman")
    drawText("Range Down 1", 1040, 510, "black", "24px Times New Roman")

    drawText("Bot Level: ", 355, 860, "black", "40px Times New Roman")

    rounded_rect(555, 800, 90, 90, "#F0D92ECF")
    //555, 800  640, 890  botspeed=1
    if (makeButton(555, 800, 640, 890)) {
        botSpeed = botSpeedList[0]
    }
    rounded_rect(705, 800, 90, 90, "#F0D92ECF")
    //705, 800  795, 890  botspeed=3
    if (makeButton(705, 800, 795, 890)) {
        botSpeed = botSpeedList[1]
    }
    rounded_rect(855, 800, 90, 90, "#F0D92ECF")
    //855, 800  845, 890  botspeed=5
    if (makeButton(855, 800, 845, 890)) {
        botSpeed = botSpeedList[2]
    }
    rounded_rect(1005, 800, 90, 90, "#F0D92ECF")
    //1095, 800  1185, 890  botspeed=10
    if (makeButton(1095, 800, 1185, 890)) {
        botSpeed = botSpeedList[3]
    }
    rounded_rect(1155, 800, 90, 90, "#F0D92ECF")
    //1155, 800  1245, 890  botspeed=20
    if (makeButton(1155, 800, 1245, 890)) {
        botSpeed = botSpeedList[4]
    }

    drawText(botSpeedList[0], 590, 860, "black", "40px Times New Roman")
    drawText(botSpeedList[1], 740, 860, "black", "40px Times New Roman")
    drawText(botSpeedList[2], 890, 860, "black", "40px Times New Roman")
    drawText(botSpeedList[3], 1030, 860, "black", "40px Times New Roman")
    drawText(botSpeedList[4], 1180, 860, "black", "40px Times New Roman")

    rounded_rect(1550, 775, 225, 100, "orange")
    //Enable 1s 1550 775 1775 875
    if (makeButton(1550, 775, 1775, 875)) {
        enable1s = !enable1s
        mouseX = 0
        mouseY = 0
    }

    if (enable1s) {
        drawText("1s Enabled", 1580, 838, "black", "36px Times New Roman")
    }
    else {
        drawText("1s Disabled", 1580, 838, "black", "36px Times New Roman")
    }

    rounded_rect(825, 160, 150, 50, "#FF4545")
    drawText("Suprise me", 835, 190, "black", "28px Times New Roman")

    if (makeButton(825, 160, 975, 210)) {
        range = Math.round(Math.random() * 963) + 36
        randomDice = true
        customDice = false
        fourDice = false
        diceRange = 10
        randomBoard = true
        patternBoard = false
        customBoard = false
        enable1s = false
        firstScene = false
        startTimer = true
        customScene = false
    }

    //Presets

    if (makeButton(1750, 0, 1800, 50)) {
        let presetList = window.prompt("Input presets: ").split(",")
        range = presetList[0]
        diceRange = presetList[1]
        botSpeed = presetList[2]

        //presetList[3] true means a pattern board false means random

        if (presetList[3] == true) {
            patternBoard = true
            randomBoard = false
        }

        //presetList[4] true means custom dice 

        if (presetList[4] == true) {
            customDice = true
            randomDice = false
        }

        enable1s = presetList[5]
        mouseX = 900
        mouseY = 100
    }

    rounded_rect(800, 50, 200, 100, "#34EC77DF")
    //Done 800, 50  1000, 150
    if (makeButton(800, 50, 1000, 150)) {
        firstScene = false
        customScene = false
        startTimer = true
    }

    drawText("Done", 850, 110, "black", "36px Times New Roman")
    //drawText("Disabled", 1300, 600, "red", "60px Arial")
    drawText("Disabled", 250, 600, "red", "60px Arial")

    if (range < 36) {
        range = 36
    }

    if (diceRange < 2) {
        diceRange = 2
    }
    boardNums = (generateBoard(range, randomBoard))
}
function removeFractionals(list) {
    let i = 0
    while (i < list.length) {
        if (amount_of_x_in_list(4, list) > 0) {
            list[list.indexOf(4)] = 2
        }
        if (amount_of_x_in_list(8, list) > 0) {
            list[list.indexOf(8)] = 2
        }
        if (amount_of_x_in_list(16, list) > 0) {
            list[list.indexOf(16)] = 2
        }
        if (amount_of_x_in_list(9, list) > 0) {
            list[list.indexOf(9)] = 3
        }
        i += 1
    }
    i = 0
}
function calculateDice() {
    diceCalculated = true
    if (randomDice == false) {
        if (customDice && diceRange < 1000) {
            //console.log("Hi")
            try {
                diceString = window.prompt("Type in the dice numbers seperated by spaces")
                theDice = diceString.split(" ")
                console.log(theDice[0] + ", " + theDice[1] + ", " + theDice[2])
                diceRange = 1000
            }
            catch (error) {
                errorScreen = true
                startTimer = false
                firstScene = false
            }
        }
        else {
            /*
            theDice = [2, 2, 3]
            diceString = "2 2 3"
            */
        }
    }

    if (randomDice) {
        theDice = []

        // How many ones should we allow in theDice list (how many dice can equal 1)

        let diceOnes = 1

        if (!enable1s) {
            diceOnes = 0
        }

        theDice.push(Math.round(Math.random() * diceRange + 0.5))
        theDice.push(Math.round(Math.random() * diceRange + 0.5))
        theDice.push(Math.round(Math.random() * diceRange + 0.5))
        while (amount_of_x_in_list(1, theDice) > diceOnes) {
            theDice = []
            theDice.push(Math.round(Math.random() * diceRange + 0.5))
            theDice.push(Math.round(Math.random() * diceRange + 0.5))
            theDice.push(Math.round(Math.random() * diceRange + 0.5))
        }
        diceString = ""
        diceString += theDice[0] + " " + theDice[1] + " " + theDice[2]
    }
}
function botLoyalToBot3(dice1, dice2, dice3, ptop) {
    let tempvar1 = dice1
    let tempvar2 = dice2
    let tempvar3 = dice3

    if (!botDone) {
        let current_answer = 0
        let o1 = ""
        let o2 = ""

        //Choosing Order
        {
            if (order_chooser == 2) {
                dice1 = tempvar2
                dice2 = tempvar1
                ptop[0] = tempptop[1]
                ptop[1] = tempptop[0]
            }
            if (order_chooser == 3) {
                dice1 = tempvar3
                dice3 = tempvar1
                ptop[0] = tempptop[2]
                ptop[2] = tempptop[0]
            }
            if (order_chooser == 4) {
                dice2 = tempvar3
                dice3 = tempvar2
                ptop[1] = tempptop[2]
                ptop[2] = tempptop[1]
            }
            if (order_chooser == 5) {
                dice1 = tempvar3
                dice3 = tempvar2
                dice2 = tempvar1
                ptop[0] = tempptop[2]
                ptop[2] = tempptop[1]
                ptop[1] = tempptop[0]
            }
            if (order_chooser == 6) {
                dice1 = tempvar2
                dice3 = tempvar1
                dice2 = tempvar3
                ptop[0] = tempptop[1]
                ptop[2] = tempptop[0]
                ptop[1] = tempptop[2]
            }
        }
        //Choosing Equations
        {

            //Equations using +
            if (equation_chooser == 1) {
                current_answer = Math.pow(dice1, p1) + Math.pow(dice2, p2) + Math.pow(dice3, p3)
                o1 = "+"
                o2 = "+"
            }
            if (equation_chooser == 2) {
                current_answer = Math.pow(dice1, p1) + Math.pow(dice2, p2) - Math.pow(dice3, p3)
                o1 = "+"
                o2 = "-"
            }
            if (equation_chooser == 3) {
                current_answer = Math.pow(dice1, p1) + Math.pow(dice2, p2) * Math.pow(dice3, p3)
                o1 = "+"
                o2 = "*"
            }
            if (equation_chooser == 4) {
                current_answer = Math.pow(dice1, p1) + Math.pow(dice2, p2) / Math.pow(dice3, p3)
                o1 = "+"
                o2 = "/"
            }
            //Equations using -
            if (equation_chooser == 5) {
                current_answer = Math.pow(dice1, p1) - Math.pow(dice2, p2) + Math.pow(dice3, p3)
                o1 = "-"
                o2 = "+"
            }
            if (equation_chooser == 6) {
                current_answer = Math.pow(dice1, p1) - Math.pow(dice2, p2) - Math.pow(dice3, p3)
                o1 = "-"
                o2 = "-"
            }
            if (equation_chooser == 7) {
                current_answer = Math.pow(dice1, p1) - Math.pow(dice2, p2) * Math.pow(dice3, p3)
                o1 = "-"
                o2 = "*"
            }
            if (equation_chooser == 8) {
                current_answer = Math.pow(dice1, p1) - Math.pow(dice2, p2) / Math.pow(dice3, p3)
                o1 = "-"
                o2 = "/"
            }
            //Equations using *
            if (equation_chooser == 9) {
                current_answer = Math.pow(dice1, p1) * Math.pow(dice2, p2) + Math.pow(dice3, p3)
                o1 = "*"
                o2 = "+"
            }
            if (equation_chooser == 10) {
                current_answer = Math.pow(dice1, p1) * Math.pow(dice2, p2) - Math.pow(dice3, p3)
                o1 = "*"
                o2 = "-"
            }
            if (equation_chooser == 11) {
                current_answer = Math.pow(dice1, p1) * Math.pow(dice2, p2) * Math.pow(dice3, p3)
                o1 = "*"
                o2 = "*"
            }
            if (equation_chooser == 12) {
                current_answer = Math.pow(dice1, p1) * Math.pow(dice2, p2) / Math.pow(dice3, p3)
                o1 = "*"
                o2 = "/"
            }
            //Equations using /
            if (equation_chooser == 13) {
                current_answer = Math.pow(dice1, p1) / Math.pow(dice2, p2) + Math.pow(dice3, p3)
                o1 = "/"
                o2 = "+"
            }
            if (equation_chooser == 14) {
                current_answer = Math.pow(dice1, p1) / Math.pow(dice2, p2) - Math.pow(dice3, p3)
                o1 = "/"
                o2 = "-"
            }
            if (equation_chooser == 15) {
                current_answer = Math.pow(dice1, p1) / Math.pow(dice2, p2) * Math.pow(dice3, p3)
                o1 = "/"
                o2 = "*"
            }
            if (equation_chooser == 16) {
                current_answer = Math.pow(dice1, p1) / Math.pow(dice2, p2) / Math.pow(dice3, p3)
                o1 = "/"
                o2 = "/"
            }

        }

        if (amount_of_x_in_list(current_answer, boardNums) == 1) {
            tempList[current_answer].push([dice1, dice2, dice3, current_answer, p1, p2, p3, 1, 1, o1, o2])
            if (amount_of_x_in_list(current_answer, bot_numbers_gotten) == 0) {
                bot_numbers_gotten.push(current_answer)
                botNumbersCompleted[boardNums.indexOf(current_answer)] = 1
                equations[current_answer] = (dice1 + "^" + p1.toString() + " " + o1 + " " + dice2.toString() + "^" + p2.toString() + " " + o2 + " " + dice3.toString() + "^" + p3.toString() + " = " + current_answer.toString())
            }
        }

        if (p1 < ptop[0]) {
            p1 += 1
        }
        else if (p2 < ptop[1]) {
            p1 = 0
            p2 += 1
        }
        else if (p3 < ptop[2]) {
            p3 += 1
            p2 = 0
            p1 = 0
        }
        else if (equation_chooser < 16) {
            equation_chooser += 1
            p1 = 0
            p2 = 0
            p3 = 0
        }
        else if (order_chooser < 6) {
            order_chooser += 1
            equation_chooser = 0
            p1 = 0
            p2 = 0
            p3 = 0
        }
        else {
            botDone = true
        }
    }
}
function difficultyOfEquation(equation) {

    //Dice 1, 2, 3, sum, pow1, pow2, pow3, symbol1, symbol2, symbol string 1, symbols string 2
    //Symbol key: 1 = +, 2 = -, 3 = *, 4 = / 

    let powRange = [20, 1, 20, 13, 10, 9, 10, 8, 7, 7, 7, 7, 6, 6, 6, 7, 6, 8, 5, 7]
    let i = 0
    let j = 0
    let dicePowers = []
    let diceAmount = 3
    let listOfDistances = []

    while (j < diceAmount) {
        dicePowers.push([])
        while (i < powRange[equation[j]]) {
            dicePowers[j].push(Math.pow(equation[j], i))
            i += 1
        }
        j += 1
        i = 0
    }

    i = 0
    j = 0


    while (j < diceAmount) {
        while (i < dicePowers[j].length) {
            listOfDistances.push(Math.abs(dicePowers[j][i] - equation[3]))
            i += 1
        }
        j += 1
        i = 0
    }
    i = 0
    j = 0


    //Find shortest distance

    listOfDistances.sort(function (a, b) { return a - b })
    let shortestDistance = listOfDistances[0]

    let zeroPowers = amount_of_x_in_list(0, [equation[4], equation[5], equation[6]])
    let onePowers = amount_of_x_in_list(1, [equation[4], equation[5], equation[6]])

    //EquationValues is the numbers used in the equation (if 2^7 is used it has 128 not 2).  For example, 2^7 - 3^3 - 5^0 = 100 would be [128, 27, 1]

    let equationValues = [Math.pow(equation[0], equation[4]), Math.pow(equation[1], equation[5]), Math.pow(equation[2], equation[6])]

    //Find largest equation value

    equationValues.sort(function (a, b) { return b - a })
    let largestNum = equationValues[0]

    let largestNumDist = Math.abs(largestNum - equation[3])

    let smallestMultiplier = 0

    //Reset the sorting of equationValues
    equationValues = [Math.pow(equation[0], equation[4]), Math.pow(equation[1], equation[5]), Math.pow(equation[2], equation[6])]

    //Calculate the smallest multiplier (the equation actually adds in the the large multiplier as well just sqrt(x)/5)

    if (equation[9] == "*") {
        if (equationValues[0] >= equationValues[1]) {
            if (smallestMultiplier > 1) {
                smallestMultiplier = equationValues[1] + Math.pow(equationValues[0], 0.5) / 5
            }
            else {
                smallestMultiplier = -1.2
            }
        }
        if (equationValues[0] < equationValues[1]) {
            if (smallestMultiplier > 1) {
                smallestMultiplier = equationValues[0] + Math.pow(equationValues[1], 0.5) / 5
            }
            else {
                smallestMultiplier = -1.2
            }
        }
    }

    if (equation[10] == "*") {
        if (equationValues[1] >= equationValues[2]) {
            if (smallestMultiplier > 1) {
                smallestMultiplier = equationValues[2] + Math.pow(equationValues[1], 0.5) / 5
            }
            else {
                smallestMultiplier = -1.2
            }
        }
        if (equationValues[1] < equationValues[2]) {
            if (smallestMultiplier > 1) {
                smallestMultiplier = equationValues[1] + Math.pow(equationValues[2], 0.5) / 5
            }
            else {
                smallestMultiplier = -1.2
            }
        }
    }



    //difficultyVariables has [Result of equation, Shortest distance between a base number and the result, 
    //amount of ^0s, amount of ^1s, Largest number in equation, Distance between largest number in equation and the result]

    let difficultyVariables = [equation[3], shortestDistance, zeroPowers, onePowers, largestNum, largestNumDist, smallestMultiplier]

    //Difficulty calculation

    let newDifficulty = 4 + Math.pow(difficultyVariables[0], 0.5) / 15 + difficultyVariables[1] / 12 + ((-1 * difficultyVariables[2]) / 0.75) + ((-1 * difficultyVariables[3]) / 1.25) + Math.pow(difficultyVariables[4], 0.5) / 16 + difficultyVariables[5] / 9 + difficultyVariables[6] / 2

    if (newDifficulty < 3.2) {
        newDifficulty = 3.2
    }
    return Math.round(newDifficulty * 50) / 100

}
function firstScreen() {
    rounded_rect(1150, 325, 250, 150, "#42c2f5")
    rounded_rect(400, 325, 250, 150, "#42c2f5")

    drawText("Custom", 1215, 405, "black", "36px Times New Roman")
    drawText("Preset Boards", 425, 405, "black", "36px Times New Roman")

    if (makeButton(1150, 325, 1400, 475)) {
        customScene = true
        firstScene = false
    }

    if (makeButton(400, 325, 650, 475)) {
        presetScene = true
        firstScene = false
    }
}
function miniBoard(x, y, board_numbers, size = 25) {
    let i = 0
    let j = 0


    while (i < 7) {
        drawLine(x, y + i * size, x + size * 6, y + i * size, "black", 2)
        drawLine(x + i * size, y, x + i * size, y + size * 6, "black", 2)
        i += 1
    }

    i = 0
    while (i < 6) {
        while (j < 6) {
            if (board_numbers[i * 6 + j] > 99) {
                drawText(board_numbers[i * 6 + j], x + size / 7 + j * size, y + size / 1.6 + i * size, "black", "11px arial")
            }
            else {
                drawText(board_numbers[i * 6 + j], x + size / 5 + j * size, y + size / 1.6 + i * size, "black", "11px arial")
            }
            j += 1
        }
        j = 0
        i += 1
    }
    i = 0
    j = 0
}
function diceOption(x, y, dice_list) {
    Stroke_Rect(x, y, 85, 50, "black", 0, 2)
    drawText(dice_list[0] + " " + dice_list[1] + " " + dice_list[2], x + 12, y + 35, "black", "24px Times New Roman")
}
function presetBoardScreen() {
    let patternBoards = []
    let i = 0
    let j = 0

    drawText("Popular Boards", 800, 60, "black", "28px Times New Roman")

    while (i < 8) {
        patternBoards.push([])
        while (j < 36) {
            patternBoards[i].push((j + 1) * (i + 1))
            j += 1
        }
        i += 1
        j = 0
    }
    i = 0
    j = 0

    while (i < 8) {
        miniBoard(100 + i * 200, 100, patternBoards[i])
        if (makeButton(100 + i * 200, 100, 250 + i * 200, 250)) {
            if (theDice[0] > 0) {
                boardNums = patternBoards[i]
                leaderboardBoardIndex = i
                presetScene = false
                startTimer = true
                mouseX = 0
                mouseY = 0
            }
            else {
                boardNums = patternBoards[i]
                leaderboardBoardIndex = i
                presetScene = false
                startTimer = true
                mouseX = 0
                mouseY = 0

                theDice = [2, 3, 4]
                leaderboardDiceIndex = 2
                diceString = "2 3 4"
            }
        }
        i += 1
    }

    i = 0

    let popularDice = [[2, 3, 1], [2, 3, 2], [2, 3, 4], [2, 3, 5], [2, 3, 6], [2, 3, 7], [2, 3, 10], [2, 3, 12], [2, 3, 15], [2, 3, 18], [2, 3, 20], [2, 2, 2], [2, 2, 4],
    [2, 2, 5], [2, 2, 6], [2, 2, 12], [2, 2, 18], [2, 2, 20], [2, 5, 6], [2, 5, 10], [2, 5, 12], [2, 5, 20], [2, 6, 6], [2, 6, 12], [3, 3, 6], [3, 6, 6], [3, 6, 12]]

    drawText("Popular Dice", 800, 700, "black", "28px Times New Roman")

    while (i < popularDice.length - 1) {
        if (i < 13) {
            diceOption(100 + 120 * i, 730, popularDice[i])
            if (makeButton(100 + 120 * i, 730, 185 + 120 * i, 780)) {
                theDice = popularDice[i]
                leaderboardDiceIndex = i
                diceString = popularDice[i][0] + " " + popularDice[i][1] + " " + popularDice[i][2]
            }

            if (theDice == popularDice[i]) {
                rect(101 + 120 * i, 731, 83, 48, "#00FFFFAF")
            }
        }
        else {
            diceOption(100 + 120 * (i - 13), 830, popularDice[i])
            if (makeButton(100 + 120 * (i - 13), 830, 185 + 120 * (i - 13), 880)) {
                theDice = popularDice[i]
                leaderboardDiceIndex = i
                diceString = popularDice[i][0] + " " + popularDice[i][1] + " " + popularDice[i][2]
            }
            if (theDice == popularDice[i]) {
                rect(101 + 120 * (i - 13), 831, 83, 48, "#00FFFFAF")
            }

        }
        i += 1
    }

    //Custom button

    rounded_rect(1650, 775, 125, 75, "#88DDFF", 1)
    drawText("Custom", 1660, 820, "black", "32px Times New Roman")

    if(makeButton(1650, 775, 1775, 850)) {
        presetScene = false
        customScene = true
    }





    //miniBoard(100, 300, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ,11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36])
    //miniBoard(300, 300, [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60, 62, 64, 66, 68, 70, 72])
}
//The loop variables.

let i = 0
let j = 0

//The board range and the board numbers.

let range = 140
let boardNums = []
boardNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

//Customizing board and dice
let randomBoard = true
let patternBoard = false
let customBoard = false
let randomDice = true
randomDice = false
let customDice = false
let fourDice = false

//The dice range, the dice as a string (to be displayed), and the dice as a list.

let diceRange = 6
let diceString = "0 0 0"
let theDice = [0, 0, 0]

//Has the timer started?

let startTimer = false

//The number that runs the timer.

let timerNum = 0

//Is the round done?

let roundDone = false

//The numbers the player and bot have knocked off.

let numbersCompleted = []
let bot_numbers_gotten = []

//Player and bot scores

let playerScore = 0
let botScore = 0

//The equations the bot used to knock off the numbers (consider replacing this with bestEquations)

let equations = []

let botNumbersCompleted = []
let botSpeedList = [1, 2, 3, 5, 10]

//Getting rid of the first screen and going straight to the presetScene
let presetScene = false
let firstScene = false
let customScene = true

// 0:Random, 1:Pattern, 2:Custom

let boardType = 0
let botSpeed = 5
let errorScreen = false
let baseNums = []
let enable1s = false
let resultFromDifficiultiesFunction = 0

//Have the dice been calculated?

let diceCalculated = false

//Other variables

let botDone = false
let bot3Done = false
let bestEquations = []
let bestEquationsBackup = []
let currentDiff = 0
let botTicker = 0
let randomNum = 0

let p1 = 0
let p2 = 0
let p3 = 0

let order_chooser = 0
let equation_chooser = 0
let ptop = [12, 12, 12]

let botCompletedDisplay = []
let tempptop = ptop
let tempList = [[]]
let timesList = []
let botLevel = 15
let bot3Cycler = 0
let playerCounter = 0
let playerCounterList = []
let additionCaluclated = false
let timeCalculated = 60

let boardCover = false
let scoreBoard = false

let maxScore = 0

let leaderboardBoardIndex = 0
let leaderboardDiceIndex = 0

//Leaderboard list layout: list[popularBoard i][popularDice i][0][index] score and [1][index] returns name
//To get best scores on the 1-36 board (popularBoard index 0) with 2 3 1 (popularDice index 0) list[0][0][0] should return a list of the scores and list[0][0][1] contains the names

let masterLeaderboardList = []

//8 is how many boards there are
//26 is the dice numbers
//When imported from a file this won't be needed

while (i < 8) {
    masterLeaderboardList.push([])
    while (j < 26) {
        masterLeaderboardList[i].push([], [])
        j += 1
    }
    j = 0
    i += 1
}

i = 0
j = 0

//Makes the player and bot's boards show that no numbers have been knocked off the board

while (i < 36) {
    numbersCompleted.push(-1)
    botCompletedDisplay.push(0)
    i += 1
}
i = 0


function main() {
    ctx.clearRect(0, 0, 2000, 2000)

    //Not needed because I deleted the first scene, it should go straight to presetScene

    //if (firstScene) {

        //The options menu

        //firstScreen()
        //customBoardScreen()
    //}

    if (customScene) {
        randomDice = true
        customDice = false
        fourDice = false
        customBoardScreen()
    }

    if (presetScene) {
        randomDice = false
        customDice = false
        fourDice = false
        presetBoardScreen()
    }

    if (startTimer) {

        //Calculate the dice


        if (!diceCalculated) {
            calculateDice()
            while (i < 36) {
                maxScore += boardNums[i]
                i += 1
            }
            i = 0
        }

        //Remove 4, 8, 16, and 9 from the dice and replace 2, 2, 2, and 3 to avoid the bot having to use fractional powers.  The regular numbers are still displayed
        removeFractionals(theDice)

        playerScore = 0
        botScore = 0

        // Calculate the player's score

        while (i < 36) {
            if (numbersCompleted[i] == 1 && !additionCaluclated) {
                playerScore += boardNums[i]
            }
            i++
        }
        i = 0

        //Make the player and the bot's board

        makeBoard(200, 100, 100, boardNums, true)
        makeBoard(1000, 100, 100, boardNums)


        //Display the dice

        drawText(diceString, 440, 780, "black", "60px Times New Roman")
        drawText(diceString, 1240, 780, "black", "60px Times New Roman")

        //Display timer

        if (startTimer && (timerNum / 30) < 60.1) {
            drawText(Math.round(timerNum / 30), 880, 75, "black", "60px Times New Roman")
            timerNum += 1
            playerCounter += 1
        }



        if (!additionCaluclated && playerScore == maxScore) {
            timeCalculated = timerNum / 30
            additionCaluclated = true
        }
        if (additionCaluclated) {
            playerScore = Math.round(maxScore * (60 / timeCalculated))
            //console.log(timeCalculated)
        }


        //End the round when the timer goes off

        if ((timerNum / 30) > 60) {
            roundDone = true
        }

        if (!roundDone) {

        }


        //Bot variables
        let dice1 = theDice[0]
        let dice2 = theDice[1]
        let dice3 = theDice[2]

        //If bot3 isn't done, run it.

        if (!bot3Done) {

            //Create 1000 spaces to store equations for the numbers 1-1000 in templist

            while (i < 1000) {
                tempList.push([])
                i += 1
            }
            i = 0

            while (!botDone) {

                //botLoyalToBot3 runs the same commands as bot would, but interacts with tempList and the bots lists (bot_numbers gotten, equations, and botNumbersCompleted).  
                //This command uses a systematic approach rather than random guessing to ensure all equations are run through.

                botLoyalToBot3(dice1, dice2, dice3, ptop)
            }
            i = 0

            //Sort bot_numbers_gotten so in the future the bot can go after the highest numbers first.

            bot_numbers_gotten.sort(function (a, b) { return a - b })

            //These variables need to be declared here or the computer gets mad, not sure why tho.

            let difficulties = []
            let sortedDifficulties = []
            let newValue = 0

            //Run through the 1K numbers in tempList (j will be the number the rest of the algo is working on).  For example, if j=220, the program will get the best equations to solve 220.

            while (j < tempList.length - 1) {

                //Run through all of the different equations that equal j

                while (i < tempList[j].length - 1) {

                    //Difficulty of the current equation (tempList[j][i])

                    currentDiff = difficultyOfEquation(tempList[j][i])

                    //Add 11th (I think) variable to current equation list that represents difficulty.

                    tempList[j][i].push(currentDiff)

                    //The list difficulties stores all of the difficulties of the equations that can equal j.  It will later be sorted to find the least difficult equation.

                    difficulties.push(currentDiff)

                    //Currently is identical to difficulties, but will later be sorted so we have one normal list and one sorted list. 

                    sortedDifficulties.push(currentDiff)

                    //This shows that the bot can get j with an equation, even if it may be a high difficulty.

                    botNumbersCompleted[j] = 1
                    i++
                }

                //Sort sortedDifficulties in ascending order

                sortedDifficulties.sort(function (a, b) { return a - b })

                //newValue represents the least difficult equation to get j with.

                newValue = tempList[j][difficulties.indexOf(sortedDifficulties[0])]

                //Reset these lists to reuse on next j

                sortedDifficulties = []
                difficulties = []

                //If there is an equation, push it to bestEquations, else just push a blank list.

                if (newValue == undefined) {
                    bestEquations.push([])
                }
                else {
                    bestEquations.push(newValue)
                }
                botNumbersCompleted.push(0)

                i = 0
                j += 1

            }
            i = 0
            j = 0
            bot3Done = true
            bestEquationsBackup = bestEquations
        }

        //If (The bot got the current number (or if it is possible))

        if (botNumbersCompleted[boardNums[37 - botTicker]] == 1 && !roundDone) {

            //currentDiff = the difficulty of the best equation to get the current board number (boardNums[37-botTicker])

            currentDiff = bestEquationsBackup[boardNums[37 - botTicker]][11]

            //If it is < 12 difficulty

            if (currentDiff < 12) {

                //Makes more difficult problems take longer.  This is the equation: if(A random number from 1 to the difficulty level = difficulty level)
                //This gives a 1/difficulty level chance of running the code

                if (bot3Cycler * (botSpeed * 0.85 / 10) > currentDiff * 30) {

                    //The bot finally gets to knock off the number

                    botCompletedDisplay[37 - botTicker] = 1
                    bot3Cycler = 0
                    botTicker += 1
                    console.log(equations[39 - botTicker])
                    //console.log("Bot ticker: "  + botTicker)
                }
                else {
                    bot3Cycler += 1
                }
            }
            else {
                if (Math.round(0.5 + Math.random() * 40) == 40) {
                    botTicker += 1
                }
            }
        }
        else {
            botTicker += 1
        }

        //Display the numbers the bot has gotten

        while (i < 36) {
            if (botCompletedDisplay[i] == 1) {
                rect((i - Math.floor(i / 6) * 6) * 100 + 1001, Math.floor(i / 6) * 100 + 101, 98, 98, "#00FFFFAF")
                botScore += boardNums[i]
                
            }
            i += 1
        }

        i = 0

        //Display the scores

        drawText("Score: " + playerScore, 400, 65, "black", "50px Times New Roman")
        drawText("Score: " + botScore, 1200, 65, "black", "50px Times New Roman")

        //Button for covering bot's board
        
        drawText("Hide Board", 875, 190, "black", "12px Calabri")
        rect(875, 200, 50, 50, "#66ccff")

        if(makeButton(875, 200, 925, 250)) {
            boardCover = true
        }

        if(makeButton(1000, 10, 1600, 700)) {
            boardCover = false
        }

        //console.log(boardCover)

        if(boardCover && !roundDone) {
            rect(1000, 100, 600, 600, "#99ccff")
        }

        //Shows equations while completing them

        if (equations.length > 0) {
            //drawText(equations[equations.length - 1], 1200, 850, "black", "40px Times New Roman")
        }

        //Shows equations at the endfor verification and debugging

        if (roundDone) {

            if(scoreBoard) {

            rounded_rect(750, 110, 300, 580, "#f2eb85f8")
            drawText("Top Scores", 820, 140, "black", "32px Times New Roman")
            drawLine(750, 153, 1050, 153, "black", 2)
            //let currentHighScores = [["Player123 ", 3654], ["John Doe", 3402], ["Ben Dover", 3322], ["Jack Smith", 3210], ["Jane Smith", 3197], ["Jane Doe", 3110], ["John Doe", 3020], ["Joe Smith", 2884], ["John Smith", 2642], ["Joe Doe", 2000]]
            let currentHighScores = [["Player123 ", 3654], ["John Doe", 3402], ["Ben Dover", 3322], ["Jack Smith", 3210], ["Jane Smith", 3197]]
            while (i < currentHighScores.length) {
                drawText((i + 1) + ". " + currentHighScores[i][0] + ": " + currentHighScores[i][1], 765, 185 + 40 * i, "black", "28px Times New Roman")
                i += 1
            }

            i = 0

            drawLine(750, 565, 1050, 565, "black", 2)
            drawText("Your score: " + playerScore, 765, 605)

        }

            

            //Add later
            //drawLine(750, 625, 1050, 625, "black", 2)
            //drawText("Average bot score: " + "3300", 765, 660)

           // console.log(timesList)


           //Shows equations

           /*
            while (i < equations.length) {
                if (botCompletedDisplay[i] == 1) {
                    drawText(equations[boardNums[i]], 1620, j * 20 + 50, "black", "16px Times New Roman")
                    j += 1
                }
                i += 1
            }
            */
        }

        j = 0
        i = 0
    }
}

const framesPerSecond = 30;
setInterval(main, 1000 / framesPerSecond);

/*
Old code you might eventually need

Line 959

if(timerNum/adjustedBotSpeed == Math.round(timerNum/adjustedBotSpeed)) {

Line 970

}

            else {
                while(i < botSpeed/10) {
                    bot2(boardNums, theDice, baseNums)
                    i += 1
                }
                if(timerNum/newAdjustedBotSpeed == Math.round(timerNum/newAdjustedBotSpeed)) {
                    bot2(boardNums, theDice, baseNums)
                }
            }

            i = 0

line 630

//let adjustedBotSpeed = Math.round(10/botSpeed)
//let newAdjustedBotSpeed = 10/((botSpeed/10 - Math.floor(botSpeed/10)) * 10)

line 573 (old dice counter for bot2)

        else if (bot_k < theDice.length - 1) {
            bot_j = 0
            bot_i = 0
            if(theDice[0] == theDice[1]) {
                bot_k = 2
            }
            else if(bot_k == 1 && theDice[1] == theDice[2]) {
                bot_k = 2
                bot_i = 36
                //bot_j = baseNums[bot_k].length - 1
            }
            else    {
            bot_k += 1
            }
        }

line 470

    if(baseNums[0][baseNums[0].length-1] <baseNums[1][baseNums[1].length-1]) {
        if(baseNums[1][baseNums[1].length-1] <baseNums[2][baseNums[2].length-1]) {
        n1 = theDice[2]
        n2 = theDice[1]
        n3 = theDice[0]
        }
        else {
            n1 = theDice[1]
            n2 = theDice[2]
            n3 = theDice[0]
        }
    }
    else if(baseNums[0][baseNums[0].length-1] <baseNums[2][baseNums[2].length-1]) {
        n1 = theDice[2]
        n2 = theDice[0]
        n3 = theDice[1]
    }

line 476

if (bot_k < theDice.length) {
        if(bot_k==1) {
            n2 = theDice[0]
        }
        if(bot_k==2) {
            n3 = theDice[1]
        }

    In the functions list

function difficultyOfEquation(equation) {
    //Dice 1, 2, 3, sum, pow1, pow2, pow3, symbol1, symbol2, symbol string 1, symbols string 2
    //Symbol key: 1 = +, 2 = -, 3 = *, 4 = /

    //let equation = [2, 2, 3, 143, 7, 4, 0, 1, 2, "+", "-"]

    let stringEquation = equation[0] + "^" + equation[4] + " " + equation[9] + " " + equation[1] + "^" + equation[5] + " " + equation[10] + " " + equation[2] + "^" + equation[6] + " = " + equation[3]
    let difficultyVariables = []
    let powRange = [20, 1, 20, 13, 10, 9, 10, 8, 7, 7, 7, 7, 6, 6, 6, 7, 6, 8, 5, 7]
    let i = 0
    let j = 0
    let dicePowers = []
    let diceAmount = 3
    let listOfDistances = []

    while (j < diceAmount) {
        dicePowers.push([])
        while (i < powRange[equation[j]]) {
            dicePowers[j].push(Math.pow(equation[j], i))
            i += 1
        }
        j += 1
        i = 0
    }

    i = 0
    j = 0


    while (j < diceAmount) {
        while (i < dicePowers[j].length) {
            listOfDistances.push(Math.abs(dicePowers[j][i] - equation[3]))
            i += 1
        }
        j += 1
        i = 0
    }
    i = 0
    j = 0


    //Find shortest distance
    listOfDistances.sort(function (a, b) { return a - b })
    let shortestDistance = listOfDistances[0]

    let zeroPowers = amount_of_x_in_list(0, [equation[4], equation[5], equation[6]])
    let onePowers = amount_of_x_in_list(1, [equation[4], equation[5], equation[6]])

    //EquationValues is the numbers used in the equation (if 2^7 is used it has 128 not 2).  For example, 2^7 - 3^3 - 5^0 = 100 would be [128, 27, 1]
    let equationValues = [Math.pow(equation[0], equation[4]), Math.pow(equation[1], equation[5]), Math.pow(equation[2], equation[6])]
    //Find largest equation value
    equationValues.sort(function (a, b) { return b - a })
    let largestNum = equationValues[0]

    let largestNumDist = Math.abs(largestNum - equation[3])

    let smallestMultiplier = 0

    //New variable
    //Reset the sorting of equationValues
    equationValues = [Math.pow(equation[0], equation[4]), Math.pow(equation[1], equation[5]), Math.pow(equation[2], equation[6])]

    //Calculate the smallest multiplier (the equation actually adds in the the large multiplier as well just sqrt(x)/5)

    if (equation[9] == "*") {
        console.log(equationValues)
        if (equationValues[0] >= equationValues[1]) {
            smallestMultiplier = equationValues[1] + Math.pow(equationValues[0], 0.5) / 5
        }
        if (equationValues[0] < equationValues[1]) {
            smallestMultiplier = equationValues[0] + Math.pow(equationValues[1], 0.5) / 5
        }
    }

    if (equation[10] == "*") {
        if (equationValues[1] >= equationValues[2]) {
            smallestMultiplier = equationValues[2] + Math.pow(equationValues[1], 0.5) / 5
        }
        if (equationValues[1] < equationValues[2]) {
            smallestMultiplier = equationValues[1] + Math.pow(equationValues[2], 0.5) / 5
        }
    }



    //difficultyVariables has [Result of equation, Shortest distance between a base number and the result,
    //amount of ^0s, amount of ^1s, Largest number in equation, Distance between largest number in equation and the result]
    difficultyVariables.push(equation[3], shortestDistance, zeroPowers, onePowers, largestNum, largestNumDist, smallestMultiplier)

    //Difficulty = pow(IVars[0], 0.5)/10 + IVars[1]/10 + ((-1*IVars[2])/10) + ((-1*IVars[3])/15) + IVars[5]/8

    //drawText(difficultyVariables,200, 200, "black")

    //Difficulty calculation
    let difficulty = Math.pow(difficultyVariables[0], 0.5) / 10 + difficultyVariables[1] / 10 + ((-1 * difficultyVariables[2]) / 10) + ((-1 * difficultyVariables[3]) / 15) + difficultyVariables[5] / 8
    let newDifficulty = Math.pow(difficultyVariables[0], 0.5) / 12 + difficultyVariables[1] / 12 + ((-1 * difficultyVariables[2]) / 6) + ((-1 * difficultyVariables[3]) / 15) + Math.pow(largestNum, 0.5) / 20 + difficultyVariables[5] / 10 + difficultyVariables[6] / 2

    console.log(smallestMultiplier)

    return ([stringEquation + "   Difficulty: " + (Math.round(10 * newDifficulty) / 10), (Math.round(10 * newDifficulty) / 10), stringEquation + "   Difficulty: " + (Math.round(10 * difficulty) / 10)])
}


function bot3(boardNums, theDice) {
    let i = 0
    let j = 0
    let botNumbersCompleted = []
    let bot_numbers_gotten = []
    let equations = []
    let p1 = 0
    let p2 = 0
    let p3 = 0
    let order_chooser = 0
    let equation_chooser = 0
    let botDone = false

    let dice1 = theDice[0]
    let dice2 = theDice[1]
    let dice3 = theDice[2]

    //Static variables for the dice to anchor them when swapping.
    let tempvar1 = dice1
    let tempvar2 = dice2
    let tempvar3 = dice3

    let ptop = [12, 12, 12]
    //Static variables for ptop to anchor them when swapping.
    let tempptop = ptop
    //List of all equations for the numbers using the dice.
    let tempList = [[]]
    //String version of tempList.  Not being used at all right now.
    let string_of_tempList = "Start: "

    while (i < boardNums.length) {
        tempList.push([])
        i += 1
    }
    i = 0


    while (!botDone) {
        botLoyalToBot3(dice1, dice2, dice3, ptop,p1, p2, p3)
    }
    i = 0



    bot_numbers_gotten.sort(function (a, b) { return a - b })


    i = 0
    j = 0
    let tempEquation
    let difficulties = []
    let sortedDifficulties = []
    let currentDiff = 0
    let bestEquations = []
    let newValue = 0
    botNumbersCompleted = [0]

    while (j < tempList.length - 1) {
        while (i < tempList[j].length - 1) {
            tempEquation = tempList[j][i]
            //console.log(tempEquation)
            currentDiff = difficultyOfEquation(tempEquation)
            tempList[j][i].push(currentDiff)
            difficulties.push(currentDiff)
            sortedDifficulties.push(currentDiff)
            botNumbersCompleted[j] = 1
            i++
        }
        sortedDifficulties.sort(function (a, b) { return a - b })
        //tempList[j][difficulties.indexOf(sortedDifficulties[0])].push(sortedDifficulties[0])
        newValue = tempList[j][difficulties.indexOf(sortedDifficulties[0])]
        //console.log(newValue)
        sortedDifficulties = []
        difficulties = []
        bestEquations.push(newValue)
        botNumbersCompleted.push(0)
        //bestEquations[j] = tempList[j][difficulties.indexOf(sortedDifficulties[0])]
        i = 0
        j += 1

    }
    i = 0
    j = 0

    //console.log(bestEquations)
    //console.log(botNumbersCompleted[142])
    /
    while (i < boardNums.length()) {
        if (botNumbersCompleted[i + 1] == 1) {
            rect((i / 40 - Math.floor(i / 40)) * 40 * 40 + 50, Math.floor(i / 40) * 25 + 50, 40, 25, "#00FFFFAF")
            console.log(i)
            drawText(i + 1 + "(" + bestEquations[i + 1][11] + ")", (i / 40 - Math.floor(i / 40)) * 40 * 40 + 50 + 2, Math.floor(i / 40) * 25 + 50 + 15, "black", "10px Times New Roman")
        }
        else {
            drawText(1 + i, (i / 40 - Math.floor(i / 40)) * 40 * 40 + 50 + 2, Math.floor(i / 40) * 25 + 50 + 15, "black", "10px Times New Roman")
        }
        stroke_rect((i / 40 - Math.floor(i / 40)) * 40 * 40 + 50, Math.floor(i / 40) * 25 + 50, 40, 25, "black")

        i++
    }
    i = 0
    /

    return bestEquations
}
    Old bot2 code

            Old bot2 code on line 1179 (in the if!rounddone)

            if (baseNums.length < 1) {

                //Generate the base numbers for the bot's equations

                baseNums = baseNumGenerator(boardNums, theDice)
            }

            //Runs the bot botSpeed/600 times per loop or 3*botSpeed times per minute

            if (Math.random() * 600 < botSpeed)
                if (!bot2done) {
                    bot2(boardNums, theDice, baseNums, 0, false)
                    bot2(boardNums, theDice, baseNums, 1, false)
                    bot2(boardNums, theDice, baseNums, 2)
                }
                else {
                    bot(theDice[0], theDice[1], theDice[2], botPowerTop)
                }

    Old difficulty generator

function difficultyOfEquation(equation) {

    //Dice 1, 2, 3, sum, pow1, pow2, pow3, symbol1, symbol2, symbol string 1, symbols string 2
    //Symbol key: 1 = +, 2 = -, 3 = *, 4 = /

    let powRange = [20, 1, 20, 13, 10, 9, 10, 8, 7, 7, 7, 7, 6, 6, 6, 7, 6, 8, 5, 7]
    let i = 0
    let j = 0
    let dicePowers = []
    let diceAmount = 3
    let listOfDistances = []

    while (j < diceAmount) {
        dicePowers.push([])
        while (i < powRange[equation[j]]) {
            dicePowers[j].push(Math.pow(equation[j], i))
            i += 1
        }
        j += 1
        i = 0
    }

    i = 0
    j = 0


    while (j < diceAmount) {
        while (i < dicePowers[j].length) {
            listOfDistances.push(Math.abs(dicePowers[j][i] - equation[3]))
            i += 1
        }
        j += 1
        i = 0
    }
    i = 0
    j = 0


    //Find shortest distance
    listOfDistances.sort(function (a, b) { return a - b })
    let shortestDistance = listOfDistances[0]

    let zeroPowers = amount_of_x_in_list(0, [equation[4], equation[5], equation[6]])
    let onePowers = amount_of_x_in_list(1, [equation[4], equation[5], equation[6]])

    //EquationValues is the numbers used in the equation (if 2^7 is used it has 128 not 2).  For example, 2^7 - 3^3 - 5^0 = 100 would be [128, 27, 1]
    let equationValues = [Math.pow(equation[0], equation[4]), Math.pow(equation[1], equation[5]), Math.pow(equation[2], equation[6])]
    //Find largest equation value
    equationValues.sort(function (a, b) { return b - a })
    let largestNum = equationValues[0]

    let largestNumDist = Math.abs(largestNum - equation[3])

    let smallestMultiplier = 0

    //New variable
    //Reset the sorting of equationValues
    equationValues = [Math.pow(equation[0], equation[4]), Math.pow(equation[1], equation[5]), Math.pow(equation[2], equation[6])]

    //Calculate the smallest multiplier (the equation actually adds in the the large multiplier as well just sqrt(x)/5)

    if (equation[9] == "*") {
        //console.log(equationValues)
        if (equationValues[0] >= equationValues[1]) {
            smallestMultiplier = equationValues[1] + Math.pow(equationValues[0], 0.5) / 5
        }
        if (equationValues[0] < equationValues[1]) {
            smallestMultiplier = equationValues[0] + Math.pow(equationValues[1], 0.5) / 5
        }
    }

    if (equation[10] == "*") {
        if (equationValues[1] >= equationValues[2]) {
            smallestMultiplier = equationValues[2] + Math.pow(equationValues[1], 0.5) / 5
        }
        if (equationValues[1] < equationValues[2]) {
            smallestMultiplier = equationValues[1] + Math.pow(equationValues[2], 0.5) / 5
        }
    }



    //difficultyVariables has [Result of equation, Shortest distance between a base number and the result,
    //amount of ^0s, amount of ^1s, Largest number in equation, Distance between largest number in equation and the result]
    difficultyVariables.push(equation[3], shortestDistance, zeroPowers, onePowers, largestNum, largestNumDist, smallestMultiplier)

    //Difficulty = pow(IVars[0], 0.5)/10 + IVars[1]/10 + ((-1*IVars[2])/10) + ((-1*IVars[3])/15) + IVars[5]/8

    //drawText(difficultyVariables,200, 200, "black")

    //Difficulty calculation
    let difficulty = 3 + Math.pow(difficultyVariables[0], 0.5) / 10 + difficultyVariables[1] / 10 + ((-1 * difficultyVariables[2]) / 10) + ((-1 * difficultyVariables[3]) / 15) + difficultyVariables[5] / 8
    let newDifficulty = 3 + Math.pow(difficultyVariables[0], 0.5) / 12 + difficultyVariables[1] / 12 + ((-1 * difficultyVariables[2]) / 6) + ((-1 * difficultyVariables[3]) / 15) + Math.pow(largestNum, 0.5) / 20 + difficultyVariables[5] / 10 + difficultyVariables[6] / 2

    if (newDifficulty > 50) {
        newDifficulty = 50
    }
    if (newDifficulty < 3) {
        newDifficulty = 3
    }
    //console.log(smallestMultiplier)

    return Math.round(newDifficulty)

    //return ([(Math.round(10 * newDifficulty) / 10),stringEquation + "   Difficulty: " + (Math.round(10 * newDifficulty) / 10), (Math.round(10 * newDifficulty) / 10), stringEquation + "   Difficulty: " + (Math.round(10 * difficulty) / 10)])
}




*/
