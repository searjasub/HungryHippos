// keydata:  
// [{keyCode: #keycode, action: functionToRun}]

class KeyDetection {

    static keyData = [{keyCode: 82, action: () => {alert("The W has Been Pressed")}},
                    {keyCode: 67, action: () => {alert("The C has Been Pressed")}},
                    {keyCode: 77, action: () => {alert("The M has Been Pressed")}},
                    {keyCode: 80, action: () => {alert("The P has Been Pressed")}}
                    ];

    static init() {
        window.addEventListener("keydown", this.checkKeyPress, false);
    }

    static addKeyData(keyData) {
        KeyDetection.keyData = KeyDetection.keyData.concat(keyData);
    }

    static checkKeyPress(key) {
        // runs through all the keydata
        KeyDetection.keyData.forEach((keyDatum) => {
            //checks for a keycode match
            if (keyDatum.keyCode == key.keyCode) {
                // executes the function
                keyDatum.action();
            }
        });
    }
}