
class Dog{
    //intilize attributes
    String name;
    String breadType;
    int age;

    public void setName(String name){
        this.name = name;
    }

    public void printDetails(){
        System.out.println(this.name);
    }
}


public class Test{
// creating object for dog class using new keyword
public static void main(String[] args){
    Dog dogObj = new Dog();  
    dogObj.setName("Gabe");
    dogObj.printDetails();
    System.out.println("works");
}
}



