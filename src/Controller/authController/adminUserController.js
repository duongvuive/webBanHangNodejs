const User = require('../../Model/userModel');
const bcrypt = require('bcrypt');
const adminUserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách người dùng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy danh sách người dùng' });
        }
    },
    createUser: async (req, res) => {
        try {
            const { fullname, email, phone_number, address, password, role_id } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            // Gọi phương thức tạo người dùng từ model
            const userId = await User.createUser({ fullname, email, phone_number, address, password: hashedPassword, role_id });

            // Trả về ID của người dùng đã được tạo
            res.status(201).json({ message: 'Người dùng đã được tạo thành công', userId: userId });
        } catch (error) {
            console.error('Lỗi khi tạo người dùng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo người dùng' });
        }
    },
    deleteUser: async (req, res) => {
        
        try {
            // const userId = req.body.id;
            // // Gọi phương thức xóa người dùng từ model
            // console.log('Hien thi id :',userId);
            // console.log(typeof userId);
            const userId = req.params.userId;//Lấy userId từ URL parameter
            const affectedRows = await User.deleteUser(userId);
           
            // Kiểm tra xem có người dùng nào được xóa không
            if (affectedRows > 0) {
                res.status(200).json({ message: 'Người dùng đã được xóa thành công' });
            } else {
                res.status(404).json({ error: 'Không tìm thấy người dùng để xóa' });
            }
        } catch (error) {
            console.error('Lỗi khi xóa người dùng:', error);
            res.status(500).json({ error: 'Đã xảy ra lỗi khi xóa người dùng' });
        }
    }
};

module.exports = adminUserController;
