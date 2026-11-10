# MBTI 16 型人格冒險學院

適用國中課堂的 **80 題性格冒險探索**、**16 型人格角色圖鑑**、**男女各一款的 32 款角色插畫**，以及可下載的專屬 PNG 角色卡。

- [開始人格探索（GitHub Pages）](https://mikibear418.github.io/mbti-adventure-academy/)
- [A4 課堂掃碼海報（可列印）](https://mikibear418.github.io/mbti-adventure-academy/poster.html)

## 性別選擇與角色卡

- 首頁、16 型角色圖鑑、測驗過程及結果頁均可選擇「女生角色」、「男生角色」或「不指定（原版）」。
- **16 種人格 × 男、女各 1 款＝32 款對應的角色插畫。** 男女版本共享相同的人格名稱、描述、優勢與建議。
- 測驗成績、80 題答案和四組偏好計分均與性別無關；切換只會更換圖像。
- 完成測驗後，結果頁即時顯示所選形象，「下載角色卡 PNG」會將所選版本畫入卡片。
- 本次頁籤選擇只存在瀏覽器的 sessionStorage，不上傳或收集性別資訊；重新開啟新頁籤時預設為原版。
- 圖卡為本站新增的奇幻學院風格 SVG 插畫；原有 16 張 AI 插畫保留供「不指定（原版）」使用。

## 網站檔案

- `index.html`：保留原版 80 題、原有 16 人格說明、計分與 PNG 輸出，**不覆蓋原始題庫**。
- `assets/gender-cards.js`：16 型、32 款男女對應 SVG 插畫與選擇邏輯。
- `assets/gender-cards.css`：性別選擇器的電腦與手機響應式版面。
- `poster.html`：課堂掃碼海報，可使用瀏覽器「列印 A4」。
- `assets/`：原有 ENFP、INTJ 圖像及已驗證的課堂 QR Code。
- `.github/workflows/validate.yml`：檢查原版 80 題、16 型人格，以及新增 32 張圖像與切換邏輯。
- `.github/workflows/deploy.yml`：發布時把性別介面載入原版 HTML，並檢查公開網站。

## GitHub Pages 設定

若 GitHub Actions 顯示 `Create Pages site failed` 或 `Get Pages site failed`，在儲存庫的 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。然後在 Actions 重跑「Publish MBTI Adventure Academy」，或推送更新到 `main`。

> 本網站為教學自我探索用途，非官方 MBTI 心理衡鑑；不能用來診斷、分班或評斷個人能力。性別角色形象是藝術選項，不是人格特質或性別能力的判斷。
