SET FOREIGN_KEY_CHECKS = 1;
DROP PROCEDURE IF EXISTS sp_add_karyawan_salman;

DELIMITER $$
CREATE PROCEDURE `sp_add_karyawan_salman`(
IN nip TEXT(11),
IN nama TEXT(256),
IN alamat TEXT(256),
IN photo TEXT(256),
IN gend TEXT(256),
IN tglLahir TEXT(24),
IN status INT(2),
IN adminId INT(2)
)

BEGIN 
	INSERT INTO karyawan (
	nip,
	nama,
	alamat,
	gend,
	photo,
	tgl_lahir,
	status,
	insert_at,
	insert_by) 
	VALUES (nip,nama,alamat,gend,photo,tglLahir,status,NOW(),adminId);
    
	PREPARE stmt FROM 'INSERT INTO log_trx_api (`user_id`, `api`, `request`, `response`, `insert_at`) VALUES (?,?,?,?,?)';
	SET @request := CONCAT('{"nama":"', nama, '", "alamat":"', alamat, '","gend":"', gend, '","photo":"', photo, '","tgl_lahir":"', tglLahir, '","status":"', status, '"');
	SET @api = '/user/add';
	SET @response = '{"status":200,"message":"Berhasil menambahkan data karyawan"}}';
	SET @insertAt = NOW();
    SET @userId = adminId;
	EXECUTE stmt USING @userId, @api, @request, @response, @insertAt;
	DEALLOCATE PREPARE stmt;
	-- INSERT INTO log_trx_api (`user_id`, `api`, `request`, `response`, `insert_at`) VALUES (SCOPE_IDENTITY(), @api, @request, @response, @insertAt);
	
END$$
DELIMITER ;

CALL sp_add_karyawan_salman(20241234314, "Salman Test SP 4", "Jl.TestSp 4","e2","L","2000-12-25 00:00:00","1","1");