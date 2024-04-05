const User = require('../../Model/userModel');
const Role =require('../../Model/roleModel');
const bcrypt = require('bcrypt');
const adminUserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAllUsers();
            // Khai báo một đối tượng để lưu trữ tên của các vai trò
            const roleNames = {};
            
            // Lặp qua mỗi người dùng để lấy tên của vai trò dựa trên role_id
            for (const user of users) {
                // Lấy tên của vai trò từ bảng Role dựa trên role_id
                const roleName = await Role.findNameRole(user.role_id);
                // Lưu tên vai trò vào đối tượng roleNames
                roleNames[user.role_id] = roleName;
            }     
            // Kiểm tra loại yêu cầu: nếu là JSON, xuất JSON, ngược lại, xuất view
            if (req.headers['content-type'] === 'application/json') {
                res.status(200).json(users);
            } else {
                res.render('listAllUsers.ejs', { users: users, roleNames: roleNames });
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách người dùng' });
        }
    }
    
    ,
    createUser: async (req, res) => {
        try {
            const { fullname, email, phone_number, address, password, role_id } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            // Gọi phương thức tạo người dùng từ model
            const userId = await User.createUser({ fullname, email, phone_number, address, password: hashedPassword, role_id });
            // Trả về ID của người dùng đã được tạo
            if (req.headers['content-type'] === 'application/json') {
                res.status(201).json({ message: 'Người dùng đã được tạo thành công', userId: userId });
            } else {
                res.redirect('/admin');
            }
            
        } catch (error) {
            console.error('Lỗi khi tạo người dùng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo người dùng' });
        }
    },
    deleteUser: async (req, res) => {
        
        try {
            // const userId = req.body.id;
            // // Gọi phương thức xóa người dùng từ model
            const userId = req.params.userId;//Lấy userId từ URL parameter
            const affectedRows = await User.deleteUser(userId);
            if (req.headers['content-type'] === 'application/json'){
                // Kiểm tra xem có người dùng nào được xóa không
                if (affectedRows > 0) {
                    res.status(200).json({ message: 'Người dùng đã được xóa thành công' });
                } else {
                    res.status(404).json({ error: 'Không tìm thấy người dùng để xóa' });
                }
            }
            else{
                res.redirect('/admin');
            }
            
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa người dùng' });
        }
    },
    editUser: async (req, res) => {
        try {
            const { userId } = req.params;
            
            const { fullname, email, phone_number, address, role_id } = req.body;
            
            // Gọi phương thức editUser từ model để chỉnh sửa thông tin người dùng
            const affectedRows = await User.editUser(userId, { fullname, email, phone_number, address, role_id });
            if (req.headers['content-type'] === 'application/json'){
                res.status(200).json({ message: 'Thông tin người dùng đã được cập nhật thành công', affectedRows });
            }
            else{
                res.redirect('/admin');
            }
           
        } catch (error) {
            console.error('Lỗi khi chỉnh sửa người dùng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi chỉnh sửa người dùng' });
        }
    }
};

module.exports = adminUserController;
