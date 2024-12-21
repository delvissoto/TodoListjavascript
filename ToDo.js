

validateform = () => {
    let taskTitle = document.getElementById('taskTitle').value;
    let taskDesc = document.getElementById("taskDesc").value;
    let sdate = document.getElementById("sdate").value;
    let edate = document.getElementById("edate").value;
    let tstatus = document.getElementById("tstatus").value;
    

      if(taskTitle == ""){
        document.getElementById("emptytitle").innerHTML="*Please Enter a Title";
        setTimeout(()=>{
            document.getElementById("emptytitle").style.display="none";
        },3000)
         return false;
      }
      if(taskDesc == ""){
        document.getElementById("emptyDes").innerHTML ="*Please Enter a Description";
        setTimeout(()=>{
            document.getElementById("emptyDes").style.display="none";
        },3000)
        return false;
      }
      if(sdate == ""){
        document.getElementById("emptysdate").innerHTML = "*Please Enter a Starting Date";
        setTimeout(()=>{
            document.getElementById("emptysdate").style.display="none";
        },3000)
        return false;
      }
      if(edate == ""){
          document.getElementById("emptyedate").innerHTML ="*Please Enter a Ending Date";
          setTimeout(()=>{
              document.getElementById("emptyedate").style.display="none";
            },3000)
            return false;  
        }
        if(sdate > edate){
          document.getElementById("emptyedate").innerHTML = "*End date can be before start date";
          setTimeout(()=>{
              document.getElementById("emptyedate").style.display="none";
          },3000)
          return false;
        }
        if(tstatus == ""){
            document.getElementById("emptystatus").innerHTML = "*Please Select a Status";
            setTimeout(()=>{
                document.getElementById("emptystatus").style.display="none";
            },3000)
            return false;
        }
      else{
        alert("Updated");
        return true;
      }
      
 };



showlist = () => {
    let list;
    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }
    for (let i = 0; i < list.length; i++) {
        list[i].add = 1;
        list[i].edit = 0;
    }
    localStorage.setItem("list", JSON.stringify(list));
    list = JSON.parse(localStorage.getItem("list"));

    let html = "";
    list.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + (index + 1) + "</td>";
        html += "<td>" + element.taskTitle + "</td>";
        html += "<td>" + element.taskDesc + "</td>";
        html += "<td>" + element.sdate + "</td>";
        html += "<td>" + element.edate + "</td>";
        html += "<td>" + element.tstatus + "</td>";
        html +=
            '<td><button id="edit" onclick="editId(' + index +
            ')" class = "btn btn-primary">Edit</button><button id="delete" onclick="deletelist(' + index +
            ')" class="btn btn-secondary" aria-label="close">Delete</button></td>';
        html += "</tr>";

    });
    document.querySelector("#todotable tbody").innerHTML = html;

};


addData = () => {
    if (validateform() == true) {
        let taskTitle = document.getElementById("taskTitle").value;
        let taskDesc = document.getElementById("taskDesc").value;
        let sdate = document.getElementById("sdate").value;
        let edate = document.getElementById("edate").value;
        let tstatus = document.getElementById("tstatus").value;
     
        let list;
        if (localStorage.getItem("list") == null) {
            list = [];
        } else {
            list = JSON.parse(localStorage.getItem("list"));
        }

        list.push({
            taskTitle: taskTitle,
            taskDesc: taskDesc,
            sdate: sdate,
            edate: edate,
            tstatus: tstatus,
            add: 1,
            edit: 0
        });
        localStorage.setItem("list", JSON.stringify(list));


        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDesc").value = "";
        document.getElementById("sdate").value = "";
        document.getElementById("edate").value = "";
        document.getElementById("tstatus").value = "";
        showlist();
    }

};

editId = (index) => {
    console.log(index);
    list = JSON.parse(localStorage.getItem("list"));
    list[index].add = 0;
    list[index].edit = 1;

    localStorage.setItem("list", JSON.stringify(list));
    window.location.assign("Todo.html");
}

editlist = (index) => {
    document.getElementById("addtask").style.display = "none";
    document.getElementById("update").style.display = "inline-block";



    if (localStorage.getItem("list") == null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem("list"));
    }
    document.getElementById("taskTitle").value = list[index].taskTitle;
    document.getElementById("taskDesc").value = list[index].taskDesc;
    document.getElementById("sdate").value = list[index].sdate;
    document.getElementById("edate").value = list[index].edate;
    document.getElementById("tstatus").value = list[index].tstatus;

    document.querySelector("#update").onclick = function () {
        if (validateform() == true) {
            list[index].taskTitle = document.getElementById("taskTitle").value;
            list[index].taskDesc = document.getElementById("taskDesc").value;
            list[index].sdate = document.getElementById("sdate").value;
            list[index].edate = document.getElementById("edate").value;
            list[index].tstatus = document.getElementById("tstatus").value;

        }
        list[index].add = 1;
        list[index].edit = 0;

        localStorage.setItem("list", JSON.stringify(list));
        
        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDesc").value = "";
        document.getElementById("sdate").value = "";
        document.getElementById("edate").value = "";
        document.getElementById("tstatus").value = "";
        showlist();
    };

};


deletelist = (index) => {

    let listData = confirm("Are you sure to delete this item");
    if (listData) {
        if (localStorage.getItem("list") == null) {
            list = [];
        } else {
            list = JSON.parse(localStorage.getItem("list"));
        }
        list.splice(index, 1);
        localStorage.setItem("list", JSON.stringify(list));
        showlist();
        return true;
    } else {
        return false;
    }
};
routePage = () => {
    window.location.assign("Todolist.html");

}
routePage1 = () => {
    window.location.assign("Todo.html");

}

check = () => {
    list = JSON.parse(localStorage.getItem("list"));
    let indexNumber = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].add == 0 && list[i].edit == 1) {
            indexNumber = i;
            //console.log(indexNumber);
            editlist(indexNumber);
            break;
        }
    }
}

