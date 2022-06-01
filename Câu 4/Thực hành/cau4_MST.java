
class cau4_MST {

    private int V = 10;

    int minKey(int key[], Boolean mstSet[])
    {
        int min = Integer.MAX_VALUE, min_index = -1;
 
        for (int v = 0; v < V; v++)
            if (mstSet[v] == false && key[v] < min) {
                min = key[v];
                min_index = v;
            }
 
        return min_index;
    }
    void printMST(int parent[], int graph[][])
    {
        System.out.println("Edge \tWeight");
        for (int i = 1; i < V; i++){
            System.out.print(parent[i]+1 + " - ");
            System.out.print(i+1);
            System.out.print("\t" + graph[i][parent[i]]+"\n");
        }
    }

    void MST(int graph[][])
    {
        int parent[] = new int[V];
        int key[] = new int[V];
        Boolean mstSet[] = new Boolean[V];
        for (int i = 0; i < V; i++) {
            key[i] = Integer.MAX_VALUE;
            mstSet[i] = false;
        }
        key[0] = 0;
        parent[0] = -1; 
        for (int count = 0; count < V - 1; count++) {
            int u = minKey(key, mstSet);
            mstSet[u] = true;
            for (int v = 0; v < V; v++)
                if (graph[u][v] != 0 && mstSet[v] == false && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
        }
        printMST(parent, graph);
    }

	public static void main(String[] args)
	{
		cau4_MST t = new cau4_MST();
		int graph[][] = new int[][] { 
                                    {0, 5, 0, 0, 8, 8, 0, 0, 0, 0 },
                                    {5, 0, 7, 0, 10, 9, 0, 0, 0, 0}, 
                                    {0, 7, 0, 0, 11, 0, 10, 12, 0, 0}, 
                                    {0, 0, 0, 0, 0, 0, 4, 6, 0, 8}, 
                                    {8, 10, 11, 0, 9, 6, 6, 0, 5, 7}, 
                                    {8, 9, 0, 0, 9, 0, 0, 0, 14, 0}, 
                                    {0, 0, 10, 4, 6, 0, 0, 4, 8, 0}, 
                                    {0, 0, 12, 6, 0, 0, 4, 0, 0, 0}, 
                                    {0, 0, 0, 0, 5, 14, 8, 0, 0, 6}, 
                                    {0, 0, 0, 8, 7, 0, 0, 0, 6, 0}
        };
		t.MST(graph);
	}
}

