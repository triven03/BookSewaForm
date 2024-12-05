"use client";

import React, {  useState,useEffect} from "react";
import { useRouter } from 'next/router';
import moment  from 'moment';
import LodingButton from './LodingButton'

function SewaForm(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [oldData, setoldData] = useState({});
  const [update, setUpdate] = useState(false);
  const [range, setRange] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedEName, setSelectedEName] = useState("");
  const [month, setMonth] = useState(getMonth());

  const [selectedGroup, setSelectedGroup] = useState("");

  let year = new Date().getFullYear();
   

  const [radioInpt, setradioInpt]=useState({
    sendyn: "हाँ"
  });


  const [messageDisplay,setmessageDisplay]=useState('none')
  const [formSubmit,setformSubmit]=useState('none')
  const [btnDisable,setbtnDisable]=useState(false)
  const [mobNum,setmobNum]=useState("")
  const [mobClass,setmobClass]=useState("icon-right")
  const [inputVal, setinputVal] = useState({
    name: [],
    Ename:[],
    ID: [],
    number:"",
    sambhag: "",
    sewaTeam: "",
    jila: "",
    block: "",
    sewaGroup: [],
    Dm: "",
    Event: "",
    post: "",
    order: "",
    iorder: "",
    sendyn:"हाँ"
  });
  
  useEffect(() => {
    document.title = "Book Sewa Form";  
    
    // if (localStorage.getItem("Members")){

    //   let memData= JSON.parse(localStorage.getItem("Members"))
    //   console.log(memData);
    //     setMembers(current => [...current, ...memData])
    // }
    const sData = router.query.formData;

    if (sData) {
      const parsedData = JSON.parse(sData);
      // console.log(parsedData.id);
      setoldData(parsedData)
      setRange(parsedData.range)
      let nameArr=[]
      nameArr.push(parsedData.body[2])
      setinputVal({...inputVal, 
        name:nameArr,
        sambhag: parsedData.body[5],
        sewaTeam: parsedData.body[6],
        jila: parsedData.body[7],
        block: parsedData.body[8],
        sewaGroup: parsedData.body[9],
        Dm:parsedData.body[10],
        Event: parsedData.body[11],
        post: parsedData.body[12],
        order: parsedData.body[13],
        iorder: parsedData.body[14],
       }); 
       setmobNum(parsedData.body[1])  
       setSelectedName(parsedData.body[2])  
       setSelectedEName(parsedData.body[3])  
       setSelectedId(parsedData.body[4])  
       setradioInpt({sendyn:parsedData.body[16]})
       setUpdate(true)

    }
  }, []);
  
  function getCustomDate() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();


    // Agar current time 7 PM se 11:59 PM ke beech hai
    if (currentHour >= 19) {

      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      const year = currentDate.getFullYear();

    // Format the date as mm/dd/yyyy
        return `${month}/${day}/${year}`;
    } else {
        // Agar current time 12 AM se 6 AM ke beech hai
        const previousDate = new Date();
        previousDate.setDate(currentDate.getDate() - 1);
        // const formattedDate = moment(previousDate).format('l');
        const month = previousDate.getMonth() + 1;
        const day = previousDate.getDate();
        const year = previousDate.getFullYear();

    // Format the date as mm/dd/yyyy
        return `${month}/${day}/${year}`;

    }
}

  function getMonth() {
    const months = [
        "January","February","March","April","May","June","July","August","September","October","November","December"
          ];
        
          let mont=new Date().getMonth();
          let yr=new Date().getFullYear().toString().slice(-2);
        //   console.log(yr);
          
        //   console.log(months[mont]+"_"+yr);
        return months[mont]+"_"+yr;
  }
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setLoading(true)
    // let time= new Date()
    // const formattedDate = moment(time).format('l');
    const formattedDate = getCustomDate()
    // let localdate=time.toLocaleDateString();
    let formData= new FormData(event.target);
    let dataF=[]
    dataF.push(formattedDate);
    formData.forEach((v,k)=>{
      dataF.push(v);
    })

    console.log(dataF);
try {
      // let obj=JSON.stringify(dataF)
      const response = await fetch('/api/addData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data:dataF,update:update,range:range}),

      })

  // Handle response if necessary
    const data = await response.json()
    console.log(data.id.status);
    if (data.id.status==200) {
      setLoading(false)

      router.push({
        pathname: '/Components/Submitted',
        query: { savedData: JSON.stringify(data)},
      });
      // router.push('/Submitted');
    }
    else if (data.id.status==500) {
      setLoading(false);
      setformSubmit('block')
      setbtnDisable(true)
    }
    


} catch (error) {
  console.log(error);
}
   

  }

  
  const handleChangeNumber = (e) => {
    let mobNumber=e.target.value;

    setmobNum(e.target.value);
    try {
      if (mobNumber.length===10) {

        // s
        
          const data = [];
          const sheetID = '1_HttrXdduKB0p3JJT4X6QbRfupkMWAXvvIRoCDlUIiU';
          const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
          // const sheetName = 'A';
          const sheetName = 'All';
          //Api Sheet Example 

          let qu = `Select * WHERE C = "${mobNumber}"`;
          const query = encodeURIComponent(qu);
          const url = `${base}&sheet=${sheetName}&tq=${query}`;
          fetch(url)
          .then(res => res.text())
          .then(rep => {
              // console.log(rep);
              const jsData = JSON.parse(rep.substr(47).slice(0,-2));
              let table= jsData.table.rows;
              // console.log(table);
              if (table.length) {
                let obj={
                  'name': [],
                  'id': [],
                  'ename':[],
                  'block': table[0].c[10].v,
                  'sewaTeam': table[0].c[8].v,
                  'jila': table[0].c[9].v,
                  'sambhag': table[0].c[6].v,
                  "sewaGroup": [],
                  "number": checkData(table[0].c[2]),
                 }
                 
                 

                 let names=[]
                 let id=[]
                 let ename=[]
                 let sewaGroup=[]

                for (let i = 0; i < table.length; i++) {
                        let na=table[i].c[3].v
                        // id[na]=table[i].c[1].v,
                    id.push(table[i].c[1].v)
                    names.push(na);
                    ename.push(table[i].c[4].v)
                    sewaGroup.push(table[i].c[5].v)
                  }

                  obj["name"]=names;
                  obj["id"]=id;
                  obj["ename"]=ename;
                  obj["sewaGroup"]=sewaGroup;
  
                  data.push(obj);
                //  setMembers(...Members,obj)
                //  setMembers(current => [...current, obj])

                // localStorage.setItem("Members", JSON.stringify(Members));
                // console.log(Members);

                // console.log(data[0]);
                setData(data[0]);
                checkDuplicateForm(obj.id[0])
                setmessageDisplay('none')
                setmobClass("icon-right green")
            }
         else {
          console.log("no data");
          setmessageDisplay('block')
          setbtnDisable(false)
          setformSubmit('none')
          setmobClass("icon-right red")

          }
          })   
        }
 
      

      else{
          clearData();
          setmessageDisplay('none')
          setformSubmit('none')
          setbtnDisable(false)
          setmobClass("icon-right")
      }
      
  }
     catch (error) {
       console.log(error);
     }

  };

  function checkDuplicateForm(id) {
    const sheetID = '1HEx_16vWbFDkDW3IpGEnzAT5vPlZ00l8thlLMXy1Wb4';
    const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
    const sheetName = 'Map';
    //Api Sheet Example 
    let qu = `Select * WHERE F = '${id}'`;
    console.log("id ",id);
    const query = encodeURIComponent(qu);
    const url = `${base}&sheet=${sheetName}&tq=${query}`;
    fetch(url)
    .then(res => res.text())
    .then(rep => {
      // console.log(rep);
      const jsData = JSON.parse(rep.substr(47).slice(0,-2));
      console.log(jsData);
      let table= jsData.table.rows;
      // console.log(table);
      if (table.length) {
          setformSubmit('block')
          setbtnDisable(true)
      }
      else{
          setformSubmit('none')
          setbtnDisable(false)
      }

    })
  }

  function setData(data) {
    setinputVal({...inputVal, 
    name:data.name,
    ID:data.id,
    Ename:data.ename,
    number:data.number,
    sambhag: data.sambhag,
    sewaTeam: data.sewaTeam,
    jila: data.jila,
    block: data.block,
    sewaGroup: data.sewaGroup });   
    setSelectedName(data.name[0]);
    setSelectedId(data.id[0])
    setSelectedEName(data.ename[0])
    setSelectedGroup(data.sewaGroup[0])
}


function checkData(val) {
  if (val!=null) {
      return val.v
  }
  return 0;
} 

  function clearData() {
    setinputVal({
      name: [],
      ID: [],
      Ename: [],
      sambhag: "",
      jila: "",
      sewaTeam: "",
      block: "",
      sewaGroup: []
    });

    setSelectedId("");
    setSelectedName("")
    setSelectedEName("")
    
  }

  const handleChange = (e) => {
    setinputVal({...inputVal, [e.target.name]: e.target.value });
  };

  const handleChangeName = (e) => {
    setSelectedName(e.target.value);
    let pos=inputVal.name.indexOf(e.target.value);
    setSelectedId(inputVal.ID[pos])
    setSelectedEName(inputVal.Ename[pos])
    setSelectedGroup(inputVal.sewaGroup[pos])
    checkDuplicateForm(inputVal.ID[pos])
    // setinputVal({...inputVal, [e.target.name]: e.target.value });
  };


  const handleChangeRadio = (e) => {
    setradioInpt({[e.target.name]: e.target.value });
  };

  let orderNumber = isNaN(Number(inputVal.order)) ? 0 : Number(inputVal.order);
  let iorderNumber = isNaN(Number(inputVal.iorder)) ? 0 : Number(inputVal.iorder);


  return (
    <div className="demo-page" id="mainPage">
      <main className= "demo-page-content">
        
         <form action="#" onSubmit={handleSubmit} >
        <section id="memberDetails">
          <div className="href-target" id="structure"></div>
          <h1>
            CG Book Order Sewa Form
          </h1>

          <div className="nice-form-group ">
            <label htmlFor="mobNum">मोबाईल नम्बर</label>
            <input
              name="number"
              id="mobNum"
              type="tel"
              placeholder="अपना मोबाईल नम्बर डाले "
              maxLength="10"
              className={mobClass}
              required
              onInput={handleChangeNumber}
              value={mobNum}
            />
            <p className="redMessage" style={{display:messageDisplay}}>
              आपका नंबर दर्ज नहीं हैं कृपया अपने ब्लॉक या जिला सेवादार से संपर्क करे 
            </p>
          
          </div>


          <div className="nice-form-group">
            <label htmlFor="name">नाम</label>
            <select value={selectedName}  name="name" id="name" required onChange={handleChangeName} >
              {inputVal.name.map(option => (
                // <option key={option.id} value={option.name} id={option.id} >
                <option key={option} value={option}  >
                  {option}
                </option>
              ))}
           </select>
            {/* <input id="name" name="name" type="text" placeholder="अपना नाम हिन्दी में लिखें" readOnly={true} value={inputVal.name}/> */}
          </div>

         
            <input
              name="ename"
              type="hidden"
              placeholder="आपका Name"
              className="icon-right"
              required
              value={selectedEName}
              readOnly={true}
            />

            <input
              name="ID"
              id="mId"
              type="hidden"
              placeholder="आपका ID कोड"
              className="icon-right"
              required
              value={selectedId}
              readOnly={true}
            />
         

          <div className="nice-form-group">
            <label htmlFor="sambhag">संभाग</label>
            <input id="sambhag" type="text" name="sambhag"  placeholder="आप किस संभाग से हैं"  readOnly={true} value={inputVal.sambhag}/>
          </div>
          <div className="nice-form-group">
            <label htmlFor="team">सेवा ट्रेंड टीम</label>
            <input id="team" type="text" name="sewaTeam"  placeholder="आप कौन से ट्रेंड टीम के मेंबर हैं" readOnly={true} value={inputVal.sewaTeam}/>
          </div>

          <div className="nice-form-group">
            <label htmlFor="jila">जिला</label>
            <input id="jila" type="text" name="jila"  placeholder="आप किस जिले से हैं"  readOnly={true} value={inputVal.jila}/>
          </div>

          <div className="nice-form-group">
            <label htmlFor="block">ब्लॉक</label>
            <input id="block" type="text" name="block"  placeholder="आप किस ब्लॉक से हैं" readOnly={true} value={inputVal.block}/>
          </div>

          <div className="nice-form-group">
            <label htmlFor="sewaGroup">सेवा ग्रुप</label>
            <input id="sewaGroup" type="text" name="sewaGroup"  placeholder="आप कौन से ग्रुप के मेंबर हैं" readOnly={true} value={selectedGroup}/>
          </div>

          </section>

          <section id="sewadetails">

              <div className="nice-form-group">
                <label htmlFor="Dm">आज कितने मैसेज(DM) / मेल किए ?</label>
                <input id="Dm" type="number" name="Dm" placeholder="1234" required value={inputVal.Dm} onChange={handleChange} />
              </div>

              <div className="nice-form-group">
                <label htmlFor="Event">आज कितने इवेंट बनाये / टैग किए ?</label>
                <input id="Event" type="number" name="Event" placeholder="1234" required value={inputVal.Event} onChange={handleChange} />
              </div>

              <div className="nice-form-group">
                <label htmlFor="post">आज कितने पोस्ट किए ?</label>
                <input id="post" type="number" name="post" placeholder="1234" required value={inputVal.post} onChange={handleChange}/>
              </div>

              <div className="nice-form-group">
                <label htmlFor="order">आज आपने बुक आर्डर ऐप में कितने भारतीय आर्डर भेजे ?</label>
                <input id="order" type="number" name="order" placeholder="1234" required value={inputVal.order} onChange={handleChange}/>
              </div>

              {/* <div className="nice-form-group">
                <label htmlFor="order">आज कितने भारतीय आर्डर आए</label>
                <input id="order" type="number" name="order" placeholder="1234" required value={inputVal.order} onChange={handleChange}/>
              </div> */}

              <div className="nice-form-group">
                <label htmlFor="iorder">आज आपने बुक आर्डर ऐप में कितने इंटरनेशनल आर्डर भेजे ?</label>
                <input id="iorder" type="number" name="iorder" placeholder="1234" required value={inputVal.iorder} onChange={handleChange}/>
              </div>

              {/* <div className="nice-form-group">
                <label htmlFor="iorder">आज कितने इंटरनेशनल आर्डर आए</label>
                <input id="iorder" type="number" name="iorder" placeholder="1234" required value={inputVal.iorder} onChange={handleChange}/>
              </div> */}



                {/* <input type="hidden" name="totalOrder" value={Number(inputVal.order)+Number(inputVal.iorder)} /> */}
              <input type="hidden" name="totalOrder" value={orderNumber + iorderNumber} />
              <fieldset className="nice-form-group">
                <legend>आज के सभी ऑर्डर सेंड कर दिए</legend>
                <div className="nice-form-group">
                  <input 
                  type="radio" 
                  name="sendyn" 
                  id="yes"  
                  value="हाँ"
                  checked={radioInpt.sendyn === "हाँ"}
                  onChange={handleChangeRadio}
                  />
                  <label htmlFor="yes">हाँ </label>
                </div>

                
                <div className="nice-form-group">
                  <input 
                  type="radio" 
                  name="sendyn" 
                  id="send" 
                  value="12 के पहले सेंड" 
                  checked={radioInpt.sendyn === "12 के पहले सेंड"}
                  onChange={handleChangeRadio}/>
                  <label htmlFor="send">12 बजे के पहले सेंड कर दूंगा / दूंगी </label>
                </div>

                <div className="nice-form-group">
                  <input 
                  type="radio" 
                  name="sendyn" 
                  id="noorder" 
                  value="आर्डर नहीं आए" 
                  checked={radioInpt.sendyn === "आर्डर नहीं आए"}
                  onChange={handleChangeRadio}
                  />

                  <label htmlFor="noorder">आर्डर नहीं आए</label>
                </div>
              </fieldset>

              <input type="hidden" name="month" value={month} />
          </section>

          <section id="lastBtn">
          <label>बंदीछोड़ सतगुरु रामपाल जी महाराज जी की जय</label>
            <details>
              <summary>
                {/* <button className="toggle-code" id="submit">
                  Submit
                </button> */}
                <p className="redMessage formSubmit" style={{display:formSubmit}}>
                आज आप फॉर्म डाल चुके हैं 
              </p>
                <LodingButton title={'Submit'} loading={loading} disable={btnDisable}/>
              </summary>
            </details>
          </section>
         </form>

        <footer>Copyright &#169; {year} CG Social Media All Right Reserved</footer>
      </main>
    </div>
  );
}


export default SewaForm
