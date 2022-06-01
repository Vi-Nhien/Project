import java.io.File;  
import java.io.FileNotFoundException; 
import java.util.Scanner; 


public class cau4 {
  private boolean adjMatrix[][];
  private int numVertices;
  public cau4(int numVertices) {
    this.numVertices = numVertices;
    adjMatrix = new boolean[numVertices][numVertices];
  }
  public void addEdge(int i, int j) {
    adjMatrix[i][j] = true;
    adjMatrix[j][i] = true;
  }
  public String toString() {
    StringBuilder s = new StringBuilder();
    for (int i = 1; i < numVertices; i++) {
      s.append(i + ": ");
      for (boolean j : adjMatrix[i]) {
        s.append((j ? 1 : 0) + " ");
      }
      s.append("\n");
    }
    return s.toString();
  }

  public static void main(String args[]) {
    cau4 g = new cau4(11);
     try {
      File myObj = new File("khoang_cach.txt");
      Scanner myReader = new Scanner(myObj);
      while (myReader.hasNextInt()) {
          int  a = myReader.nextInt();
          int  b = myReader.nextInt();
        g.addEdge(a,b);
      }
      myReader.close();
    } catch (FileNotFoundException e) {
      System.out.println("An error occurred.");
      e.printStackTrace();
    }
    System.out.print(g.toString());
  }
}