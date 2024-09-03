public class Employee{
    String name;
    int age;
    double salary;

    public Employee(String name){
        this.name = name;
    }

    public void setAge(int age){
        this.age = age;
    }

    public void setSalary(double salary){
        this.salary = salary;
    }

    public void printEmpDetails(){
        System.out.println("Name is "+ this.name);
        System.out.println("Age is " + this.age);
        System.out.println("Salary " + this.salary);
    }
}