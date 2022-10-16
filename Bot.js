const BotAPI = require('venom-bot');
const data = require('./data.json');
const myData = require('./SyllabusDATA')
let CurrentYear;
let Enno = "210170107020";
let Year = new Date().getFullYear() % 2000;


BotAPI
    .create({
        session: 'session-name', //name of session
        multidevice: false // for version not multidevice use false.(default: true)
    })
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });

async function start(client) {
    await client.onMessage(async (message) => {
        console.log(message.body);
        if (message.body === 'Academics' && message.isGroupMsg === false) {
            console.log(message);
            const AcademicsOptions = [
                {
                    "buttonText": {
                        "displayText": "Course"
                    }
                },
                // {
                //     "buttonText": {
                //         "displayText": "Admission"
                //     }
                // },
                {
                    "buttonText": {
                        "displayText": "Exam"
                    }
                }
            ]
            await client.sendButtons(message.from, 'Academics:', AcademicsOptions, 'Here are some options Academic Options')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });

        }
        else if (message.body === "Course" && message.isGroupMsg == false) {
            client
                .sendText(message.from, 'Please enter your enrollment number')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {


                    console.error('Error when sending: ', erro); //return object error
                });
        }
        else if ((Number(message.body)) && message.isGroupMsg == false) {
            Enno = message.body;
            CurrentYear = (Year - Number(message.body.slice(0, 2)) + 1);
            let list = Object.keys(myData.Syllabus[CurrentYear.toString()]);
            console.log(list);
            const courseList = [
                {
                    title: "Query:",
                    rows:
                        list.map((key) => {
                            return { title: key, description: "" }
                        })

                }
            ];
            await client.sendListMenu(message.from, '', '', 'Subjects of ' + CurrentYear.toString() + " Year, " + (data['Branch'][message.body.slice(5, 7)][message.body.slice(7, 9)]).toLowerCase() + " Branch", 'Select', courseList)
                .then((result) => {
                    // console.log('Result: ', result); //return object success
                    console.log("A List is requested from " + message.from);
                })

        }

        //********************************* Admission section
        else if (message.body === 'Admission' && message.isGroupMsg === false) {
            console.log(message);
            const AdmissionOptions = [
                {
                    "buttonText": {
                        "displayText": "Admission updates"
                    }
                },
                {
                    "buttonText": {
                        "displayText": "Past Year Cut-off"
                    }
                }
            ]
            await client.sendButtons(message.from, 'Admission Updates:', AdmissionOptions, 'Here are some options for Admission updates.')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });

        }
        else if (message.body == "Admission updates" && message.isGroupMsg === false) {
            console.log(message);

            await client
                .sendLinkPreview(
                    message.from,
                    "https://admission.gtu.ac.in/circular.aspx"
                )
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
        else if (message.body == "Past Year Cut-off" && message.isGroupMsg === false) {
            console.log(message);
            await client
                .sendFile(
                    message.from,
                    './Data/PDFs/2021_Cutoff.pdf',
                    '2021 Cut-off list',
                    'See my file in pdf'
                )
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
            endingMessage(message)
        }

        //************************* Examination section
        else if (message.body === 'Exam' && message.isGroupMsg === false) {
            console.log(message);
            const ExamOptions = [
                {
                    "buttonText": {
                        "displayText": "Time Table"
                    }
                },
                {
                    "buttonText": {
                        "displayText": "Result Updates"
                    }
                }

            ]
            await client.sendButtons(message.from, 'Examination Updates:', ExamOptions, 'Here are some options for Examination updates.')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
        //************************* Fees section
        else if (message.body === 'Fees' && message.isGroupMsg === false) {
            console.log(message);
            const ExamOptions = [
                {
                    "buttonText": {
                        "displayText": "Enrollment Fees"
                    }
                },
                {
                    "buttonText": {
                        "displayText": "Exam Fees"
                    }
                }

            ]
            await client.sendButtons(message.from, 'Examination Updates:', ExamOptions, 'Here are some options for Examination updates.')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }

        //this is for exam fees
        else if (message.body == "Exam Fees" && message.isGroupMsg === false) {
            await client
                .sendText(message.from, `Please enter your enrollment no.`)
                .then((result) => {
                    console.log(' exam fees status from ', message.from); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }

        else if (!(myData.Examination[message.body] == undefined) && message.isGroupMsg === false) {
            console.log(message);

            await client
                .sendLinkPreview(
                    message.from,
                    GTU.Examination[message.body]
                )
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
            endingMessage(message)
        }

        else if (!(myData.ExamFeesStatus[message.body] == undefined) && message.isGroupMsg === false) {
            console.log(message);

            await client
                .sendText(
                    message.from,
                    GTU.ExamFeesStatus[message.body]
                )
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
        else if (message.body == "No,your exam fees is pending" && message.isGroupMsg === false) {
            console.log(message);

            await client
                .sendText(
                    message.from,
                    GTU.Exam_fees_Status[message.body]
                )
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
            endingMessage(message)
        }
        else if (message.body == "Other" && message.isGroupMsg === false) {
            console.log(message);
            const OthersList = [
                {
                    title: "Query:",
                    rows: [
                        { title: "Scholarship", description: "" },
                        { title: "100 Points Activity", description: "" },
                        { title: "Events", description: "" },
                        // { title: "Things I should Know", description: "" },
                        // { title: "Things I should Know", description: "" },
                    ]
                }
            ];
            await client.sendListMenu(message.from, '', '', 'these are', 'Select', OthersList)
                .then((result) => {
                    // console.log('Result: ', result); //return object success
                    console.log("A List is requested from " + message.from);
                })

        }
        else if ((message.body == "Circular" || message.body == "Circular") && message.isGroupMsg === false) {
            console.log(message);
            await client
                .sendText(message.from, `You are subscribed for new circular updates`)
                .then((result) => {
                    console.log(' exam fees status from ', message.from); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });

        }
        // else if (!((myData.Syllabus[(Year - Number(message.body.slice(0, 2)) + 1)] && myData.Syllabus[(Year - Number(message.body.slice(0, 2)) + 1)][message.body]) == undefined) && message.isGroupMsg === false)
        else if (!(myData.Syllabus[(Year - Number(Enno.slice(0, 2)) + 1).toString()][message.body] == undefined) && message.isGroupMsg === false) {
            console.log(message);

            await client
                .sendFile(
                    message.from,
                    myData.Syllabus[(Year - Number(Enno.slice(0, 2)) + 1).toString()][message.body],
                    message.body + ' Syllabus',
                    'See my file in pdf'
                )
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }

        //***************************** welcome message
        else if (message.isGroupMsg === false) {
            await client
                .sendText(message.from, `Hello ${message.notifyName}!\nWelcome to GTU Portal.`)
                .then((result) => {
                    console.log(' Welcome message from ', message.from); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });

            const welcomeList = [
                {
                    "buttonText": {
                        "displayText": "Academics"
                    }
                },
                {
                    "buttonText": {
                        "displayText": "Fees"
                    }
                },
                {
                    "buttonText": {
                        "displayText": "Other"
                    }
                }
            ]
            await client.sendButtons(message.from, 'What brings you to us ?', welcomeList, 'It brings us immense pleasure to be of help to you! 😊You can choose from the below mentioned options, relevant to your query:')
                .then((result) => {
                    console.log('Result: ', result); //return object success
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
        }
    });
}