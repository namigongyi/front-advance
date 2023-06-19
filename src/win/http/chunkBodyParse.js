

export class chukBodyParse {
    constructor() {
        let lenght = 0
        let lengthStr = ''
        let body = ''
        this.currentState = readLength;
        this.write = (str) => {
            // this.currentState = readLength

            for (let char of str) {
                this.currentState = currentState(char)
            }
        }
        function readLength(char) {
            if (typeof char === '\r') {
                return beforLineBreak
            }
            lenghtStr += char;
            return readLength;
        }

        function beforLineBreak(char) {
            lenght = Number.parseInt(lengthStr, 16)
            if (char === '\n') {
                return readChunkState
            }
        }

        function readChunkState(char) {
            lenght--
            if (lenght >= 0) {
                return readChunkState
            } else {
                return readLength
            }
        }
    }
}

