<?php
// --- Database connection ---
$host = "localhost";
$user = "root";
$pass = "";
$db   = "shop";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// --- Handle Create ---
if (isset($_POST['create'])) {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $conn->query("INSERT INTO products (title, description, price) VALUES ('$title','$description','$price')");
    header("Location: index.php");
}

// --- Handle Update ---
if (isset($_POST['update'])) {
    $id = $_POST['id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $price = $_POST['price'];
    $conn->query("UPDATE products SET title='$title', description='$description', price='$price' WHERE id=$id");
    header("Location: index.php");
}

// --- Handle Delete ---
if (isset($_GET['delete'])) {
    $id = $_GET['delete'];
    $conn->query("DELETE FROM products WHERE id=$id");
    header("Location: index.php");
}

// --- Fetch product for edit ---
$editProduct = null;
if (isset($_GET['edit'])) {
    $id = $_GET['edit'];
    $result = $conn->query("SELECT * FROM products WHERE id=$id");
    $editProduct = $result->fetch_assoc();
}

// --- Fetch all products ---
$products = $conn->query("SELECT * FROM products");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PHP Single-Page CRUD</title>
</head>
<body>
    <h1>PHP CRUD - Single Page</h1>

    <!-- Create / Update Form -->
    <h2><?= $editProduct ? "Edit Product" : "Add Product" ?></h2>
    <form method="post">
        <input type="hidden" name="id" value="<?= $editProduct['id'] ?? '' ?>">
        <input type="text" name="title" placeholder="Title" required value="<?= $editProduct['title'] ?? '' ?>"><br><br>
        <textarea name="description" placeholder="Description"><?= $editProduct['description'] ?? '' ?></textarea><br><br>
        <input type="number" step="0.01" name="price" placeholder="Price" required value="<?= $editProduct['price'] ?? '' ?>"><br><br>
        <button type="submit" name="<?= $editProduct ? 'update' : 'create' ?>">
            <?= $editProduct ? "Update" : "Create" ?>
        </button>
        <?php if($editProduct): ?>
            <a href="index.php">Cancel</a>
        <?php endif; ?>
    </form>

    <hr>

    <!-- Products List -->
    <h2>Products List</h2>
    <?php if ($products->num_rows > 0): ?>
        <table border="1" cellpadding="10">
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Actions</th>
            </tr>
            <?php while($row = $products->fetch_assoc()): ?>
                <tr>
                    <td><?= $row['id'] ?></td>
                    <td><?= $row['title'] ?></td>
                    <td><?= $row['description'] ?></td>
                    <td>$<?= $row['price'] ?></td>
                    <td><?= $row['created_at'] ?></td>
                    <td>
                        <a href="?edit=<?= $row['id'] ?>">Edit</a> | 
                        <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Delete this product?')">Delete</a>
                    </td>
                </tr>
            <?php endwhile; ?>
        </table>
    <?php else: ?>
        <p>No products found.</p>
    <?php endif; ?>
</body>
</html>