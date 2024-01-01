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

  const [Members,setMembers]=useState([]);

   

  const [radioInpt, setradioInpt]=useState({
    sendyn: "हाँ"
  });


  const [messageDisplay,setmessageDisplay]=useState('none')
  const [mobNum,setmobNum]=useState("")
  const [mobClass,setmobClass]=useState("icon-right")
  const [inputVal, setinputVal] = useState({
    name: [],
    ID: [],
    number:"",
    sambhag: "",
    jila: "",
    block: "",
    team: "",
    Event: "",
    post: "",
    order: "",
    iorder: "",
    sendyn:"हाँ"
  });
  
  useEffect(() => {
    document.title = "Sewa Form";  
    
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
        sambhag: parsedData.body[4],
        jila: parsedData.body[5],
        block: parsedData.body[6],
        team: parsedData.body[7],
        Event: parsedData.body[8],
        post: parsedData.body[9],
        order: parsedData.body[10],
        iorder: parsedData.body[11],
       }); 
       setmobNum(parsedData.body[1])  
       setSelectedName(parsedData.body[2])  
       setSelectedId(parsedData.body[3])  
       setradioInpt({sendyn:parsedData.body[12]})
       setUpdate(true)

    }
  }, []);
  
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    setLoading(true)
    let time= new Date()
    const formattedDate = moment(time).format('MM/DD/YYYY');
    // let localdate=time.toLocaleDateString();
    let formData= new FormData(event.target);
    let dataF=[]
    dataF.push(`=Now()`);
    formData.forEach((v,k)=>{
      dataF.push(v);
    })

    console.log(dataF);
try {
      let obj=JSON.stringify(dataF)
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
          const sheetName = 'B';
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
                  'name': "",
                  'id': "",
                  'block': table[0].c[4].v,
                  'jila': table[0].c[5].v,
                  'sambhag': table[0].c[6].v,
                  "team": table[0].c[7].v,
                  "number": checkData(table[0].c[2]),
                 }
  
                 let names=[]
                 let id=[]
                for (let i = 0; i < table.length; i++) {
                        let na=table[i].c[3].v
                        // id[na]=table[i].c[1].v,
                    id.push(table[i].c[1].v)
                    names.push(na);
                  }
                  obj["name"]=names;
                  obj["id"]=id;
  
                  data.push(obj);
                //  setMembers(...Members,obj)
                //  setMembers(current => [...current, obj])

                // localStorage.setItem("Members", JSON.stringify(Members));
                // console.log(Members);

                // console.log(data[0]);
                setData(data[0]);
                setmessageDisplay('none')
                setmobClass("icon-right green")
            }
         else {
          console.log("no data");
          setmessageDisplay('block')
          setmobClass("icon-right red")

          }
          })   
        }
 
      

      else{
          clearData();
          setmessageDisplay('none')
          setmobClass("icon-right")
      }
      
  }
     catch (error) {
       console.log(error);
     }

  };

  function setData(data) {
    setinputVal({...inputVal, 
    name:data.name,
    ID:data.id,
    number:data.number,
    sambhag: data.sambhag,
    jila: data.jila,
    block: data.block,
    team: data.team });   
    setSelectedName(data.name[0]);
    setSelectedId(data.id[0])
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
      sambhag: "",
      jila: "",
      block: "",
      team: ""
    });

    setSelectedId("");
    setSelectedName("")
    
  }

  const handleChange = (e) => {
    setinputVal({...inputVal, [e.target.name]: e.target.value });
  };

  const handleChangeName = (e) => {
    setSelectedName(e.target.value);
    let pos=inputVal.name.indexOf(e.target.value);
    setSelectedId(inputVal.ID[pos])
    // setinputVal({...inputVal, [e.target.name]: e.target.value });
  };


  const handleChangeRadio = (e) => {
    setradioInpt({[e.target.name]: e.target.value });
  };


  return (
    <div className="demo-page" id="mainPage">
      <main className= "demo-page-content">
        
        <section>
         <form action="#" onSubmit={handleSubmit} >
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
            <select value={selectedName}  name="name" id="name" onChange={handleChangeName} >
              {inputVal.name.map(option => (
                // <option key={option.id} value={option.name} id={option.id} >
                <option key={option} value={option}  >
                  {option}
                </option>
              ))}
           </select>
            {/* <input id="name" name="name" type="text" placeholder="अपना नाम हिन्दी में लिखें" readOnly={true} value={inputVal.name}/> */}
          </div>

          <div className="nice-form-group">
            <label htmlFor="mId">ID</label>
            <input
              name="ID"
              id="mId"
              type="text"
              placeholder="आपका ID कोड"
              className="icon-right"
              required
              value={selectedId}
              readOnly={true}
            />
            {/* <input
              name="ID"
              id="mId"
              type="text"
              placeholder="आपका ID कोड"
              className="icon-right"
              required
              value={inputVal.ID}
              onChange={handleChange}
            /> */}

          </div>

          <div className="nice-form-group">
            <label htmlFor="sambhag">संभाग</label>
            <input id="sambhag" type="text" name="sambhag"  placeholder="आप किस संभाग से हैं"  readOnly={true} value={inputVal.sambhag}/>
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
            <label htmlFor="team">सेवा टीम</label>
            <input id="team" type="text" name="team"  placeholder="आप कौन सी टीम के मेंबर हैं" readOnly={true} value={inputVal.team}/>
          </div>

          <div className="nice-form-group">
            <label htmlFor="Event">आज कितने इवेंट बनाये & टैग किये </label>
            <input id="Event" type="number" name="Event" placeholder="1234" required value={inputVal.Event} onChange={handleChange} />
          </div>

          <div className="nice-form-group">
            <label htmlFor="post">आज कितने पोस्ट किये </label>
            <input id="post" type="number" name="post" placeholder="1234" required value={inputVal.post} onChange={handleChange}/>
          </div>

          <div className="nice-form-group">
            <label htmlFor="order">आज कितने भारतीय आर्डर आये </label>
            <input id="order" type="number" name="order" placeholder="1234" required value={inputVal.order} onChange={handleChange}/>
          </div>

          <div className="nice-form-group">
            <label htmlFor="iorder">आज कितने इंटरनेशनल आर्डर आये </label>
            <input id="iorder" type="number" name="iorder" placeholder="1234" required value={inputVal.iorder} onChange={handleChange}/>
          </div>

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
              name="sendyn" id="no" 
              value="नहीं" 
              checked={radioInpt.sendyn === "नहीं"}
              onChange={handleChangeRadio}
              />
              <label htmlFor="no">नहीं</label>
            </div>

            <div className="nice-form-group">
              <input 
              type="radio" 
              name="sendyn" 
              id="send" 
              value="9.30 के पहले सेंड" 
              checked={radioInpt.sendyn === "9.30 के पहले सेंड"}
              onChange={handleChangeRadio}/>
              <label htmlFor="send">9.30 के पहले सेंड कर दूंगा / दूंगी </label>
            </div>

            <div className="nice-form-group">
              <input 
              type="radio" 
              name="sendyn" 
              id="noorder" 
              value="आर्डर नहीं आये" 
              checked={radioInpt.sendyn === "आर्डर नहीं आये"}
              onChange={handleChangeRadio}
              />

              <label htmlFor="noorder">आर्डर नहीं आये</label>
            </div>
          </fieldset>

          <details>
            <summary>
              {/* <button className="toggle-code" id="submit">
                Submit
              </button> */}
              <LodingButton title={'Submit'} loading={loading}/>
            </summary>
          </details>
         </form>
        </section>

        <footer>Copyright &#169; 2023 Trivendra CG All Right Reserved</footer>
      </main>
    </div>
  );
}


export default SewaForm