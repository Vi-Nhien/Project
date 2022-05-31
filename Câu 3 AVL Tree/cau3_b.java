class Employee {
    private int id;
    private String fullName;
    private int salary;
    private String sex;
    private String address;

    public Employee(int id, String fullName, int salary, String sex, String address) {
        this.id = id;
        this.fullName = fullName;
        this.salary = salary;
        this.sex = sex;
        this.address = address;
    }

    public int getId() {
        return this.id;
    }

    @Override
    public String toString() {
        return "+ ID: " + this.id + ", full name: " + this.fullName + ", salary: " + this.salary + ", sex: " + this.sex
                + ", address: "
                + this.address + "; ";
    }

}

class AVLTree {
    class Node {
        Employee value;
        int height;
        Node left;
        Node right;

        public Node(Employee value) {
            this.value = value;
            this.height = 1;
            this.left = null;
            this.right = null;
        }
    }

    int Height(Node key) {
        if (key == null)
            return 0;

        else
            return key.height;
    }

    int Balance(Node key) {
        if (key == null)
            return 0;

        else
            return (Height(key.right) - Height(key.left));
    }

    void updateHeight(Node key) {
        int l = Height(key.left);
        int r = Height(key.right);

        key.height = Math.max(l, r) + 1;
    }

    Node rotateLeft(Node x) {
        Node y = x.right;
        Node T2 = y.left;

        y.left = x;
        x.right = T2;

        updateHeight(x);
        updateHeight(y);

        return y;
    }

    Node rotateRight(Node y) {
        Node x = y.left;
        Node T2 = x.right;

        x.right = y;
        y.left = T2;

        updateHeight(y);
        updateHeight(x);

        return x;
    }

    Node balanceTree(Node root) {
        updateHeight(root);

        int balance = Balance(root);

        if (balance > 1) {
            if (Balance(root.right) < 0) {
                root.right = rotateRight(root.right);
                return rotateLeft(root);
            }

            else // RR
                return rotateLeft(root);
        }

        if (balance < -1) {
            if (Balance(root.left) > 0) {
                root.left = rotateLeft(root.left);
                return rotateRight(root);
            } else
                return rotateRight(root);
        }

        return root;
    }

    Node Root;

    Node insert(Node root, Employee key) {
        if (root == null)
            return new Node(key);

        else if (key.getId() < root.value.getId())
            root.left = insert(root.left, key);

        else
            root.right = insert(root.right, key);

        return balanceTree(root);
    }

    Node Successor(Node root) {
        if (root.left != null)
            return Successor(root.left);

        else
            return root;
    }

    Node Remove(Node root, int key) {
        if (root == null)
            return root;

        else if (key < root.value.getId())
            root.left = Remove(root.left, key);

        else if (key > root.value.getId())
            root.right = Remove(root.right, key);

        else {
            if (root.right == null)
                root = root.left;

            else if (root.left == null)
                root = root.right;

            else {
                Node temp = Successor(root.right);
                root.value = temp.value;
                root.right = Remove(root.right, root.value.getId());
            }
        }

        if (root == null)
            return root;

        else
            return balanceTree(root);
    }

    Node findNode(Node root, int key) {
        if (root == null || key == root.value.getId())
            return root;

        if (key < root.value.getId())
            return findNode(root.left, key);

        else
            return findNode(root.right, key);
    }

    void add(Employee data) {
        Root = insert(Root, data);
        if (findNode(Root, data.getId()) == null) {
        } else
            System.out.println("\nId bị trùng vui lòng kiểm tra lại");
    }

    void searchNode(Node root, int key) {
        if (root == null || root.value.getId() == key) {
            System.out.println("\nKết quả tìm kiếm id= "+key+ "\n" + root.value);
        } else {
            
            if (key < root.value.getId()) {
                searchNode(root.left, key);
            }
            else if(key > root.value.getId() ){
                searchNode(root.right, key);
            }
        }
    }

    void search(int key) {
        try {
            searchNode(Root, key);
        } catch (Exception e) {
            System.out.println("\nkhông có dữ liệu id= "+key+" trong danh sách");
        }
        
    }

    void delete(int key) {
        if (findNode(Root, key) != null) {
            Root = Remove(Root, key);
            System.out.println("\nXóa thành công: " + key);
        }

        else
            System.out.println("\nXóa id: " + key + " không thành công");
    }

    void printNodeAVL(Node root) {
        if (root == null) {
            System.out.println("\nDữ liệu không tồn tại");
            return;
        }

        if (root.left != null)
            printNodeAVL(root.left);
        System.out.println(root.value + " ");
        if (root.right != null)
            printNodeAVL(root.right);

    }

}

public class cau3_b {
    public static void main(String[] args) {

        AVLTree tree = new AVLTree();
        tree.add(new Employee(11, "Nguyễn Văn Kế", 1200, "nam", "Đường 123 Sài Gòn"));
        tree.add(new Employee(14, "Nguyễn Thị Bé Mai", 1500, "nữ", "Đường 69 Bình Hưng Hòa"));
        tree.add(new Employee(19, "Nguyễn Bùi Anh Tú", 1100, "nam", "Đường CMT8"));
        tree.add(new Employee(17, "Bùi Văn Thề", 1800, "nam", "Đường Thống Nhất"));
        tree.add(new Employee(21, "Vũ Thị Văn", 2000, "nữ", "Đường 56 Quận 12"));

        tree.add(new Employee(25, "Bành Nguyễn Minh Mẫn", 1400, "nam", "Đường 14 Sài Gòn 2"));
        tree.add(new Employee(41, "Vũ Thị Tuyết", 1240, "nữ", "Đường 1241 Mã Lò"));
        tree.add(new Employee(20, "Trần Thị Phương Thảo", 800, "nữ", "Đường 51 Tên Lửa"));
        tree.add(new Employee(15, "Nguyễn Ngọc Hùng Trân", 1220, "nữ", "Đường 15 Thống Nhất"));
        tree.add(new Employee(31, "Nguyễn Hùng Xiêm", 1200, "nam", "Đường 169 Quận 7"));

        tree.add(new Employee(23, "Văn Thị Kề", 1400, "nữ", "Đường Gòn"));
        tree.add(new Employee(51, "Lê Minh Toàn", 1600, "nam", "Đường Đất Đá"));
        tree.add(new Employee(16, "Hoàng Thị Mai Anh", 1000, "nữ", "Đường Khong Đẹp"));
        tree.add(new Employee(35, "Mai Anh Tú", 1450, "nam", "Đường Sỏi ĐÁ"));
        tree.add(new Employee(26, "Nguyễn Văn Hoàng", 1200, "nam", "Đường Không Tên"));
        System.out.println("Hiển thị: ");
        tree.printNodeAVL(tree.Root);
        tree.delete(23);
        tree.printNodeAVL(tree.Root);
        tree.search(20);

    }
}
