export default function setDate(date, setDate) {
    setTimeout(function() {
        setDate(new Date().toLocaleDateString())
       // console.log(date)
    }, 1000);
   // console.log("A")
}


///DATE DOESNT UPDATE IF PAGE IS NOT RERENDERED

///idee LA TIMER PUSA FUNCTIA?