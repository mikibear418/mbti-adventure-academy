# MBTI 16 型人格冒險學院

適用課堂的 **80 題性格冒險探索**、**16 型角色圖鑑**與**專屬角色卡**。

- [開始人格探索（GitHub Pages）](https://mikibear418.github.io/mbti-adventure-academy/)
- [A4 課堂掃碼海報（可列印）](https://mikibear418.github.io/mbti-adventure-academy/poster.html)

## 網站檔案

- \`index.html\`：原始完整版 80 題測驗與人格卡，不更動測驗內容。
- \`poster.html\`：課堂掃碼海報，可使用瀏覽器「列印 A4」。
- \`assets/\`：從原網站資料擷取的 ENFP、INTJ 插畫及同一組 QR Code。
- \`.github/workflows/deploy.yml\`：透過 GitHub Actions 發布 GitHub Pages。

## 第一次啟用 GitHub Pages

若 Actions 顯示 \`Create Pages site failed\` 或 \`Get Pages site failed\`，請在儲存庫
**Settings → Pages → Build and deployment → Source** 選取 **GitHub Actions**。
此步驟需要由具備儲存庫管理權限的帳號完成。

完成後，在 **Actions → Publish MBTI Adventure Academy** 重新執行工作流程，或將變更推送至 \`main\`。

> 本網站為教學自我探索用途，非官方 MBTI 心理衡鑑。