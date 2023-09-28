import { useState, useEffect, useRef } from 'react';
import moment from 'moment';


const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [assistMessage, setAssistMessage] = useState(false);
    const [isAskingEmail, setIsAskingEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState(false);
    const [startChat, setStartChat] = useState(false);
    const [selectOption, setSelectOption] = useState(false);
    const [selectWrong, setSelectWrong] = useState(false);
    const [scrolled, setScrolled] = useState([]);
    const messagesEndRef = useRef(null);

    // console.log(email);
    const chatboxRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView();
    }, [scrolled]);

    useEffect(() => {
        if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {

        if (assistMessage) {
            // addBotMessage("Sorry I can not understand.Please select the option");
            setSelectWrong(true)
        }
        else if (isAskingEmail) {
            addBotMessage(`Hi, ${name}! Thank you for providing your email address.Kindly select the option`);
            setSelectOption(true);
        }
    }, [assistMessage, isAskingEmail, name]);


    const addBotMessage = (text, delay = 1000) => {
        setIsLoading(true);
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text, sender: 'bot' },
            ]);
            setIsLoading(false);
        }, delay);
    };
    const handleClick = () => {
        // setStartChat(true);
        setInfo(true);
        setScrolled(true);
    }

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };
    const botResponseService = `1. Social Media Optimization
    2. Google My Business
    3. Youtube Marketing
    4. CCaas  AI
    5. Outsourcing & Consulting`;
    const botResponsePrice = `1. Voip service / Sip Trunking
    2. Dialer
    3. Ai Based Marketing
    4. Ai Based Marketing`;
    const botResponseSupport = `Support contact:+18884915291, (6 am to 6 pm  PST)
     Sales contact : 888-491-5291 , (6am to 6pm PST)
     Support email-contact@acumensinc.com   (6 PST to 1.30 PST)`;
    const handleOption = (option) => {
        if (option === 'aiService') {
            const responses = botResponseService.split('\n');
            responses.forEach((response, index) => {
                setTimeout(() => addBotMessage(response, 100 * (index + 1)), 600 * index);
            });
            setSelectOption(true);
        } else if (option === 'pricing') {
            const responses = botResponsePrice.split('\n');
            responses.forEach((response, index) => {
                setTimeout(() => addBotMessage(response, 100 * (index + 1)), 600 * index);
            });
            setSelectOption(true);
        } else if (option === 'more') {
            const responses = botResponseSupport.split('\n');
            responses.forEach((response, index) => {
                setTimeout(() => addBotMessage(response, 100 * (index + 1)), 600 * index);
            });
            setSelectOption(true);
        }
        setSelectWrong(false);
    };


    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setStartChat(true)
        setIsAskingEmail(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        setMessages([...messages, { text: newMessage, sender: 'user' }]);

        //  setStartChat(true)
        setIsAskingEmail(false)
        setAssistMessage(true)


        setSelectOption(false)
        setSelectWrong(true)
        setNewMessage('');

        // }
    };


    // store user data
    const handleUserData=()=>{
        const userData={
            userName:name,
            userEmail:email,
            userPhnNo:phoneNo
        }
        fetch('http://localhost:3000/users',{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(userData)
        })
        .then(res=>res.json())
        .then(data=>console.log(data))
    }


    return (
        <div className={`fixed lg:bottom-4 lg:right-4 ${isOpen ? 'lg:w-96 w-full h-[500px] lg:h-[600px]' : "w-16"} transition-all duration-300`}>
            {isOpen ? (

                <div className="bg-[rgb(236,232,255)] rounded-lg shadow-md h-full overflow-hidden ">
                    <div className="flex flex-col justify-between h-full">
                        <div className="bg-[rgb(170,203,254)] text-black p-3 flex items-center justify-between ">
                            <h1 className="text-xl font-semibold">Jason</h1>
                            {/* cross btn popup */}
                            <button onClick={handleToggle} className="btn btn-sm btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>


                        </div>
                        <div
                            className="chatbox flex-grow p-4 overflow-scroll"
                            ref={chatboxRef}
                        >

                            <p className='text-xs text-center my-4 text-[rgb(0,0,0)]'>{moment().format('LLL')}</p>
                            <div className="chat chat-start lg:w-[330px]">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=" />
                                    </div>
                                </div>
                                <div className="chat-bubble bg-[rgb(245,247,254)] text-[14px] text-[rgb(0,0,0)] box-border py-[12px] px-[18px]">Hello and Welcome to the SRPL Chat! I am your personal advisor and I am happy to support you.
                                    How can I help you?</div>
                            </div>

                            <div className="chat chat-start lg:ml-10 mt-1 lg:w-[330px] ">
                                <div className="chat-bubble bg-[rgb(245,247,254)] text-[14px] text-[rgb(0,0,0)] box-border py-[12px] px-[18px]">
                                    <img className='w-full lg:w-[216px] lg:h-109px' src="https://sprcdn-assets.sprinklr.com/124/56f86459-f437-4c2e-9d0e-caf0c09f820f-1476410817/1686033759414-2_p.jpg" alt="" />
                                    <button className="btn bg-[rgb(85,85,85)] text-[rgb(255,255,255)] hover:bg-primary mt-10 w-full h-[18px] rounded-[20px]" onClick={handleClick}>Chat Now</button>
                                </div>

                            </div>
                            <div className="ml-72 ">
                                <p className='text-[10px]'>{moment().format('LT')}</p>
                            </div>
                            {
                                info &&
                                <div className="">


                                    <div className="chat chat-end my-4">
                                        <div className="">
                                            <p className='text-[10px]'>{moment().format('LT')}</p>
                                        </div>
                                        <button className='btn  shadow-lg  rounded-[20px] capitalize text-[12px] font-normal py-3 px-[18px] text-[rgb(0,0,0)] '>Chat now</button>
                                    </div>

                                    <div className="chat chat-start lg:w-[330px] scroll-smooth">
                                        <div className="chat-image avatar">
                                            <div className="w-10 rounded-full">
                                                <img src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=" />
                                            </div>
                                        </div>
                                        <div id='chat' className="chat-bubble bg-[rgb(245,247,254)] text-[14px] text-[rgb(0,0,0)] box-border py-[12px] px-[18px] ">
                                            <p>Please provide following details so that we can connect you to a Product Expert!</p>
                                            {/* form */}
                                            <form onSubmit={handleInfoSubmit}>
                                                {/* name*/}
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-xs">Name</span>
                                                    </label>
                                                    <input type="text" required placeholder="Please Enter your name"
                                                        onChange={(e) => setName(e.target.value)} className="input input-bordered" />
                                                    {/* email */}
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-[12px]">Email</span>
                                                        </label>
                                                        <input type="email" required
                                                            onChange={(e) => setEmail(e.target.value)} placeholder="Please Enter your e-mail" className="input input-bordered" />
                                                    </div>
                                                    {/* phn no */}
                                                    <div className="form-control">
                                                        <label className="label">
                                                            <span className="label-text text-[12px]">Phone no</span>
                                                        </label>
                                                        <input type="number" required
                                                            onChange={(e) => setPhoneNo(e.target.value)} placeholder="Please Enter your phn no" className="input input-bordered" />
                                                    </div>
                                                </div>
                                                <div className="">
                                                    <div className="flex items-center gap-2 mt-4">
                                                        <input type="checkbox" required name="" id="" />
                                                        <p className='text-xs text-[rgb(0,0,0)]'>I agree to Website <span className='text-blue-400 underline'>Privacy Policy</span></p>
                                                    </div>
                                                    {/* submit btn */}
                                                    <input onClick={handleUserData} type='submit' value="Submit" className="btn border-2 border-black text-black hover:bg-[rgb(85,85,85)] hover:text-[rgb(255,255,255)]  mt-10 w-full h-[18px] rounded-[20px]" />
                                                </div>
                                            </form>
                                            <div ref={messagesEndRef}></div>
                                        </div>
                                        <div className="ml-60">
                                            <p className='text-[10px]'>{moment().format('LT')}</p>
                                        </div>
                                    </div>

                                </div>
                            }
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={` chat  ${message.sender === 'user' ? 'chat-end' : 'chat-start'
                                        }`}
                                    style={message.style}
                                >

                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            {message.sender == 'user' ? <img src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" />

                                                :
                                                <img src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=" />

                                            }


                                        </div>
                                    </div>
                                    <div
                                        className={`chat-bubble text-[14px] mt-2 box-border py-[12px] px-[18px] ${message.sender === 'user' ? ' bg-gray-300 text-gray-700' : 'bg-[rgb(245,247,254)]  text-[rgb(0,0,0)]'
                                            }`}
                                    >


                                        {message.text}
                                    </div>
                                    <div className="ml-56">
                                        <p className='text-[10px]'>{moment().format('LT')}</p>
                                    </div>
                                </div>
                            ))}


                            {isLoading && (
                                <div className="text-center">
                                    <span className="loading loading-bars loading-xs"></span>
                                    <span className="loading loading-bars loading-xs"></span>

                                </div>
                            )}
                            {
                                selectOption &&
                                <div className="chat chat-start ml-10 lg:w-[330px]">

                                    <div className="chat-bubble bg-[rgb(245,247,254)] text-[14px] text-[rgb(0,0,0)] box-border py-[12px] px-[18px] flex items-center gap-2">


                                        <button onClick={() => handleOption('aiService')} className="btn btn-outline btn-primary btn-sm capitalize text-white text-[14px]">Ai Service</button>
                                        <button onClick={() => handleOption('pricing')} className="btn btn-outline btn-primary btn-sm capitalize text-white text-[14px]">Pricing</button>
                                        <button onClick={() => handleOption('more')} className="btn btn-outline btn-primary btn-sm capitalize text-white text-[14px]">Support</button>



                                    </div>
                                </div>

                            }
                            {
                                selectWrong &&
                                <div className="chat chat-start  lg:w-[370px]">
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=" />
                                        </div>
                                    </div>
                                    <div className="chat-bubble bg-[rgb(245,247,254)] text-[14px] text-[rgb(0,0,0)] box-border py-[12px] px-[18px] ">
                                        <p className='text-[14px]'>Sorry I can not understand.Please select the option</p>

                                        <div className="flex items-center gap-2 mt-3">
                                            <button onClick={() => handleOption('aiService')} className="btn btn-outline btn-primary btn-sm capitalize text-white text-[14px]">Ai Service</button>
                                            <button onClick={() => handleOption('pricing')} className="btn btn-outline btn-primary btn-sm capitalize text-white text-[14px]">Pricing</button>
                                            <button onClick={() => handleOption('more')} className="btn btn-outline btn-primary btn-sm capitalize text-white text-[14px]">Support</button>
                                        </div>



                                    </div>
                                </div>

                            }


                        </div>
                        {
                            startChat &&
                            <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-[rgb(170,203,254)]">
                                <input
                                    type="text"
                                    className="w-full border rounded-full px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                                    placeholder="Type your message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                            </form>
                        }
                    </div>
                </div>
            ) : (
                <div className="cursor-pointer  w-full">
                    <div className="text-white text-2xl" id="chat-button" onClick={handleToggle} >
                        <img className='rounded-full w-full ' src="https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=" alt="" />
                    </div>
                </div>

            )}
        </div>
    );
};

export default Chatbot;
