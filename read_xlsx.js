const XLSX = require('xlsx');
const fs = require('fs');

try {
    const workbook = XLSX.readFile('listado inicial (1).xlsx');
    console.log('Sheet Names:', workbook.SheetNames);
    
    // Dump first sheet to JSON
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    
    console.log(`Sheet 1 rows: ${data.length}`);
    console.log('Sample Row 1:', data[0]);
    console.log('Sample Row 2:', data[1]);
    console.log('Sample Row 3:', data[2]);
    console.log('Sample Row 4:', data[3]);
    console.log('Sample Row 5:', data[4]);
    
    // Save all to json
    fs.writeFileSync('xlsx_content.json', JSON.stringify({
        sheets: workbook.SheetNames.reduce((acc, name) => {
            acc[name] = XLSX.utils.sheet_to_json(workbook.Sheets[name], { defval: "" });
            return acc;
        }, {})
    }, null, 2));
    
    console.log('Written to xlsx_content.json successfully.');
} catch (err) {
    console.error('Error reading xlsx:', err);
}
