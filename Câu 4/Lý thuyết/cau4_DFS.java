import java.util.*;  
  
class cau4_DFS {  
  private LinkedList<Integer> adj[]; /*adjacency list representation*/  
  private boolean visited[];  
  
  /* Creation of the graph */  
  @SuppressWarnings("unchecked")  
  cau4_DFS(int V) /*'V' is the number of vertices in the graph*/  
  {  
    adj = new LinkedList[V];  
    visited = new boolean[V];  
  
    for (int i = 0; i < V; i++)  
      adj[i] = new LinkedList<Integer>();  
  }  
  
  /* Adding an edge to the graph */  
  void insertEdge(int src, int dest) {  
    adj[src].add(dest);  
  }  
  
  void DFS(int vertex) {  
    visited[vertex] = true; /*Mark the current node as visited*/  
    System.out.print(vertex + " ");  
  
    Iterator<Integer> it = adj[vertex].listIterator();  
    while (it.hasNext()) {  
      int n = it.next();  
      if (!visited[n])  
        DFS(n);  
    }  
  }  
  
  public static void main(String args[]) {  
    cau4_DFS graph = new cau4_DFS(11);  
  
        graph.insertEdge(1,2); 
        graph.insertEdge(1,5); 
        graph.insertEdge(1,6); 
        graph.insertEdge(2,5); 
        graph.insertEdge(2,6); 
        graph.insertEdge(2,3); 
        graph.insertEdge(5,6); 
        graph.insertEdge(3,5); 
        graph.insertEdge(3,7); 
        graph.insertEdge(3,8); 
        graph.insertEdge(5,7); 
        graph.insertEdge(7,8); 
        graph.insertEdge(6,9); 
        graph.insertEdge(5,9); 
        graph.insertEdge(9,7); 
        graph.insertEdge(9,10); 
        graph.insertEdge(4,10); 
        graph.insertEdge(4,8); 
        graph.insertEdge(4,7); 
        graph.insertEdge(5,10);   
          
        System.out.println("Depth First Traversal của biểu đồ là:");    
        graph.DFS(1);    
  }  
}  