#!/usr/bin/env node

import inquirer from "inquirer";

class Student{
    static counter = 10000;
    id :number;
    name :string;
    courses :string[];
    balance :number;

    constructor(name :string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
        
    }

    enroll_course(course:string){
        this.courses.push(course);
        
    }
       
    view_balance(){
     console.log(`Balance for ${this.name} : $${this.balance}`);
     console.log(`Remaining balance : $${this.balance}`);
     
    }

    pay_fess(amount:number){
        this.balance -= amount;
        console.log(`$${amount} Fess paid successfully for ${this.name} `);
        
    }


   show_status(){
   console.log(`id: ${this.id}`);
   console.log(`name: ${this.name}`);
   console.log(`courses: ${this.courses}`);
   console.log(`balance: $${this.balance}`);
   
   } 
}

class Student_manager{
    students:Student[]

    constructor(){
        this.students = [];

    }
   add_student(name:string){
    let student = new Student(name);
    this.students.push(student);
    console.log(`student: ${name} added successfully.Student id: ${student.id}`);

    
    }

    enroll_student(student_id:number,course:string){
       let student= this.find_student(student_id);
       if(student){
        student.enroll_course(course);
        console.log(`${student.name}enrolled in ${course} successfully`);
       }
    }

    view_student_balance(student_id:number){
        let student= this.find_student(student_id);
        if(student){
            student.view_balance();
        }
        else{
            console.log("Student not found please enter a correct student id");
            
        }
    }

     pay_fess(student_id:number,amount:number){
        let student= this.find_student(student_id);
        if(student){
            student.pay_fess(amount);
        }
        else{
            console.log("Student not found please enter a correct student id")
        }
     }
       show_status(student_id:number){
        let student= this.find_student(student_id);
        if(student){
            student.show_status();
    
        }
    
        
       }
    
       find_student (student_id:number){
         return this.students.find(std => std.id === student_id);
       } 
    
}

async function main(){
    console.log("Welcome to `Code with Darakhshan` - Student Management System. ");
    console.log("-".repeat(50));
    
    let student_manager = new Student_manager();

    while(true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "select an option",
                choices: [
                    "add student",
                    "enroll student",
                    "view student balance",
                    "pay fess",
                    "show status",
                    "Exit"
                    
                ]
            }
        ]);

        
        switch(choice.choice){
            case "add student":
            let name_input = await inquirer.prompt([
                {
                    name: "name",
                    type: "input",
                    message: "enter a student name",                    
                }
            ]);
            student_manager.add_student(name_input.name);
          break;
          case "enroll student":
            let course_input = await inquirer.prompt([
                {
                    name: "student_id",
                    type: "number",
                    message: "enter a student id", 
                    
                },{
                    name: "course",
                    type: "input",
                    message: "Enter a course name",
                }
            ]);
            student_manager.enroll_student(course_input.student_id,course_input.course);
                break;

                case "view student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "enter a student id",
                    }
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;

                case "pay fess":
                    let fess_input = await inquirer.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: "enter a student id",
                            
                        },{
                            name: "amount",
                            type: "number",
                            message: "enter the amount to pay",
                        }
                    ]);
                    student_manager.pay_fess(fess_input.student_id,fess_input.amount);
                    break;
                 case "show status":
                    let status_input = await inquirer.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: "enter a student id",                       }
                    ]);
                    student_manager.show_status(status_input.student_id);
                    break;

                    case "Exit":
                        console.log("Entering");
                        process.exit();
                        
                    



                
        }

        
    }

}

main();
