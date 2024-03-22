const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// SQLite veritabanı oluşturulması
const db = new sqlite3.Database('ogrenci.db');

// Tablo oluşturulması (Öğrenci tablosu)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS ogrenciler (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ad TEXT,
      soyad TEXT,
      sinif INTEGER
    )
  `);
});

// Middleware kullanımı
app.use(bodyParser.json());


// index.js

app.post('/ogrenci', async (req, res) => {
    const { username, password, ad, soyad, sinif } = req.body;
    console.log("istel");
    console.log(username,password,ad,soyad);
    try {
      if (!username || !password || !ad || !soyad || !sinif) {
        throw new Error('Tüm alanlar doldurulmalıdır.');
      }
  
      const query = 'INSERT INTO ogrenciler (ad, soyad, sinif, username, password) VALUES (?, ?, ?, ?, ?)';
      db.run(query, [ad, soyad, sinif, username, password], function (err) {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
  
        res.json({
          id: this.lastID,
          ad,
          soyad,
          sinif,
          username,
          password,
        });
      });
    } catch (error) {
      console.error('Öğrenci ekleme hatası:', error.message);
      res.status(500).json({ error: 'Öğrenci eklerken bir hata oluştu.', details: error.message });
    }
});
// Ders ekleme
app.post('/course', async (req, res) => {
  const { courseCode, courseName } = req.body;
  console.log(req.body);

  try {
    console.log(courseCode);
    console.log(courseName);


    if (!courseCode || !courseName) {
      throw new Error('Tüm alanlar doldurulmalıdır.');
    }

    const query = 'INSERT INTO courses (courseCode, courseName) VALUES (?, ?)';
    db.run(query, [courseCode, courseName], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ id: this.lastID, courseCode, courseName });
    });
  } catch (error) {
    console.error('Ders ekleme hatası:', error.message);
    res.status(500).json({ error: 'Ders eklerken bir hata oluştu.', details: error.message });
  }
});
app.get('/course/:courseName', (req, res) => {
  const courseName = req.params.courseName;

  const query = 'SELECT courseId FROM courses WHERE CourseName = ?';
  db.get(query, [courseName], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ error: 'Ders bulunamadı' });
    }

    res.json({ courseId: row.id });
  });
});
app.post('/enroll', async (req, res) => {
  const { courseId, studentId } = req.body;

  try {
    if (!courseId || !studentId) {
      throw new Error('Tüm alanlar doldurulmalıdır.');
    }

    const query = 'INSERT INTO student_courses (studentId, courseId) VALUES (?, ?)';
    db.run(query, [studentId, courseId], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json({ success: true, message: 'Öğrenci başarıyla dersle ilişkilendirildi.' });
    });
  } catch (error) {
    console.error('Ders kaydı alma hatası:', error.message);
    res.status(500).json({ error: 'Ders kaydı alınırken bir hata oluştu.', details: error.message });
  }
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Kullanıcı doğrulama işlemleri
    db.get('SELECT * FROM ogrenciler WHERE username = ? AND password = ?', [username, password], (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' });
        return;
      }
  
      if (row) {
        res.status(200).json({ message: 'Giriş başarılı' });
      } else {
        res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
      }
    });
  });
  app.post('/adminlogin', (req, res) => {
    const { username, password } = req.body;
    console.log(username,password);
  
    // Kullanıcı doğrulama işlemleri
    db.get('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası' });
        return;
      }
  
      if (row) {
        res.status(200).json({ message: 'Giriş başarılı' });
      } else {
        res.status(401).json({ message: 'Kullanıcı adı veya şifre hatalı' });
      }
    });
  });
// Tüm öğrencileri listeleme
app.get('/ogrenci', (req, res) => {
  const query = 'SELECT * FROM ogrenciler';

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json(rows);
  });
});
// Veritabanından tüm dersleri listeleyen endpoint
app.get('/courses', (req, res) => {
  const query = 'SELECT * FROM courses';

  // Veritabanından tüm dersleri çekme
  db.all(query, [], (err, rows) => {
    if (err) {
      // Hata durumunda uygun bir hata mesajı döndürme
      return res.status(500).json({ error: err.message });
    }

    // Başarılı olduğunda ders verilerini JSON formatında döndürme
    res.json(rows);
  });
});


// Öğrenci güncelleme
app.put('/ogrenci/:id', (req, res) => {
  const { ad, soyad, sinif } = req.body;
  const id = req.params.id;

  const query = 'UPDATE ogrenciler SET ad = ?, soyad = ?, sinif = ? WHERE id = ?';
  db.run(query, [ad, soyad, sinif, id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ id, ad, soyad, sinif });
  });
});
app.get('/student/id', (req, res) => {
  const { username } = req.query;

  // Veritabanından kullanıcı adına göre öğrenci bilgilerini çekme
  const query = 'SELECT id FROM ogrenciler WHERE username = ?';
  db.get(query, [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    res.json({ studentId: row.id });
  });
});
app.get('/student/courses', (req, res) => {
  const studentId = req.query.studentId || 1; // Öğrenci ID'sini query parametresinden al, eğer yoksa varsayılan olarak 1 kullan

  const query = `
    SELECT courses.*
    FROM student_courses
    INNER JOIN courses ON student_courses.courseId = courses.courseId
    WHERE student_courses.studentId = ?;
  `;

  db.all(query, [studentId], (err, rows) => {
    if (err) {
      console.error('Dersleri alma hatası:', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ courses: rows });
  });
});

// Öğrenci silme
app.delete('/ogrenci/:id', (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM ogrenciler WHERE id = ?';
  db.run(query, [id], (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ message: 'Öğrenci başarıyla silindi.' });
  });
});
function getStudentInfoById(studentId, callback) {
  const query = 'SELECT * FROM ogrenciler WHERE studentId = ?';
  
  // Veritabanı sorgusunu çalıştır
  db.get(query, [studentId], (err, row) => {
    if (err) {
      console.error('Veritabanı hatası:', err);
      return callback(null); // Hata durumunda null döndürülebilir
    }

    return callback(row); // Öğrenci bilgilerini döndür
  });
}
app.get('/student/info', (req, res) => {
  const studentId = req.query.studentId;

  // Öğrenci bilgilerini çek
  getStudentInfoById(studentId, (studentInfo) => {
    if (!studentInfo) {
      return res.status(404).json({ message: 'Öğrenci bulunamadı' });
    }

    res.json(studentInfo);
  });
});
async function runAsyncQuery(query, params) {
    return new Promise((resolve, reject) => {
      db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }
  
  
// Sunucu başlatma
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
