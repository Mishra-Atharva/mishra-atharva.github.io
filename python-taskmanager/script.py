# import Brython's browser module
from browser import document, html

# dictionary to store all tasks
allTasks = {}

# create <h1>
heading = html.H1("Task Manager")
document <= heading

# styling for <h1>
heading.style.backgroundColor = "#7765E3"
heading.style.color = "#ffffff"
heading.style.textAlign = "center"
heading.style.margin = "0px"
heading.style.padding = "10px"
heading.style.fontSize = "26px"

# styling for <body>
document.body.style.backgroundColor = "#232C33"
document.body.style.margin = "0px"
document.body.style.fontFamily = "Monospace"

# create <div>
container = html.DIV()
document <= container

# create <input> (text field)
inputField = html.INPUT(type="text")
container <= inputField

# create <button>
addBtn = html.BUTTON()
addBtn.textContent = "Add task"
container <= addBtn

# styling for <input>
inputField.style.padding = "7px"
inputField.style.width = "70%"
inputField.style.border = "none"
inputField.style.borderRadius = "5px"
inputField.style.marginRight = "5px"

# styling the button
addBtn.style.backgroundColor = "#28C2FF"
addBtn.style.color = "#ffffff"
addBtn.style.border = "none"
addBtn.style.borderRadius = "5px"
addBtn.style.padding = "7px 15px"
addBtn.style.cursor = "pointer"
addBtn.style.fontSize = "16px"
addBtn.style.fontWeight = "bold"
addBtn.style.fontFamily = "Monospace"

# styling for <div>
container.style.width = "460px"
container.style.margin = "20px auto"

# create <ul> to show tasks on webpage 
tasksList = html.UL()
document <= tasksList

# function called when button is clicked
def onAddBtnClick(event):
   
    # store value entered into input field
    task = inputField.value
    
    # dictionary to store task name and status
    newTask = {
        "name": task,
        "status": "Not started"
    }
    
    # add newTask dictionary to allTasks dictionary
    allTasks[task] = newTask
    #print(allTasks)
    
    # clear text field after task submission
    inputField.value = ""
    
    # call showAllTasks()
    showAllTasks()

# function to display all existing tasks
def showAllTasks():
    
    # clear previous <ul> 
    tasksList.innerHTML = ""
    
    # iterate over all submitted tasks
    # all tasks are stored to allTasks dictionary
    for i in allTasks:
        print(allTasks[i])
        
        # create <li> for each task 
        # <li> added to tasksLists <ul>
        li = html.LI()
        tasksList <= li
        
        # styling for <li> 
        li.style.listStyleType = "none"
        li.style.marginBottom = "10px"
        li.style.marginLeft = "-20px" 
        
        # create <span> to display task status
        tag = html.SPAN()
        tag.textContent = allTasks[i]["status"]
        li <= tag
        
        # change background color of the <span> depending on the task status
        if (allTasks[i]["status"] == "Not started"):
             tag.style.backgroundColor = "#FF5A5F"
        else:
            tag.style.backgroundColor = "#02C39A"
        
        # styling for task status <span>
        tag.style.color = "#ffffff"
        tag.style.fontSize = "16px"
        tag.style.width = "100px"
        tag.style.display = "inline-block"
        tag.style.textAlign = "center"
        tag.style.padding = "5px"
        tag.style.borderRadius = "5px"
        tag.style.marginRight = "7px"
        tag.style.cursor = "pointer"
        
        # add "click" event to task status <span>
        tag.bind("click", toggleStatus) 
        
        # create <span> to display task on webpage
        aSpan = html.SPAN()
        aSpan.textContent = allTasks[i]["name"]
        li <= aSpan
        
        # styling for task name <span>
        aSpan.style.color = "#ffffff"
        aSpan.style.fontSize = "16px"

# function called when task status <span> is clicked
def toggleStatus(event):
    
    # access <li> (parent element) of clicked <span>
    parent = event.currentTarget.parentElement
    
    # access task name <span> 
    # task name <span> is second child node of the <li>
    key = parent.select("span")[1].textContent
    print(key)
    
    # if current status is set to "Not started", change to "Done" when clicked
    if (allTasks[key]["status"] == "Not started"):
        allTasks[key]["status"] = "Done"
    
    # if current status is set to "Done", change to "Not started" when clicked
    else:
        allTasks[key]["status"] = "Not started"
        
    # showAllTasks() to toggle status    
    showAllTasks()
                

# add "click" event to button 
# onAddBtnClick function is called
addBtn.bind("click", onAddBtnClick)
