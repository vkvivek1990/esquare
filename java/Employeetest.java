public class Employeetest{

    public static void main(String[] args){
        Employee obj1 = new Employee("Vivek");
        obj1.setAge(34);
        obj1.setSalary(300000);
        obj1.printEmpDetails();

        Employee obj2 = new Employee("Mithran");
        obj2.setAge(2);
        obj2.setSalary(50000000);
        obj2.printEmpDetails();
    }

    
}