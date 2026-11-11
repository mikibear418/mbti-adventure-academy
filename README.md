# MBTI 16 型人格冒險學院

適用國中課堂的 **80 題性格冒險探索**、**16 型人格角色圖鑑**、**男女各一款的 32 款角色插畫**，以及可下載的專屬 PNG 角色卡。

- [開始人格探索（GitHub Pages）](https://mikibear418.github.io/mbti-adventure-academy/)
- [A4 課堂掃碼海報（可列印）](https://mikibear418.github.io/mbti-adventure-academy/poster.html)

## 性別選擇與角色卡

- 學生首頁、測驗過程及結果頁均可選擇「女生角色」、「男生角色」或「不指定（原版）」；教師、題庫與角色圖鑑不再顯示於學生首頁選單。
- **16 種人格 × 男、女各 1 款＝32 款對應的角色插畫。** 男女版本共享相同的人格名稱、描述、優勢與建議。
- 測驗成績、80 題答案和四組偏好計分均與性別無關；切換只會更換圖像。
- 完成測驗後，結果頁先顯示所選角色卡，下方依序顯示性格故事、四個偏好、優勢、成長提醒、學習方式與合作挑戰。
- 可使用「下載角色卡 PNG」或「下載角色卡＋完整結果說明 PNG」，後者整合角色插畫與解讀內容成單張長圖，可保存或列印。
- 本次頁籤選擇只存在瀏覽器的 sessionStorage，不上傳或收集性別資訊；重新開啟新頁籤時預設為原版。
- 男女圖卡採用 ImageGen 製作的奇幻學院金色典藏框 WebP 插畫；原有 16 張 AI 插畫仍供「不指定（原版）」使用。

## 網站檔案

- `index.html`：保留原版 80 題、原有 16 人格說明、計分與 PNG 輸出，**不覆蓋原始題庫**。
- `assets/gender-cards.js`：16 型、32 款男女對應 ImageGen WebP 圖卡與選擇邏輯。
- `assets/gender-cards.css`：性別選擇器的電腦與手機響應式版面。
- `assets/student-mode.js`：學生首頁精簡、隱藏教師/圖鑑入口、完整角色結果 PNG 下載。
- `assets/student-mode.css`：手機響應式與直式結果說明版面。
- `assets/characters/`：32 張網站用 WebP 圖卡。
- `assets/portraits/`：32 張直式典藏卡 WebP 圖片。
- `poster.html`：課堂掃碼海報，可使用瀏覽器「列印 A4」。
- `assets/`：原有 ENFP、INTJ 圖像及已驗證的課堂 QR Code。
- `.github/workflows/validate.yml`：檢查原版 80 題、16 型人格，以及新增 32 張 WebP 圖像與切換邏輯。
- `.github/workflows/deploy.yml`：發布時把性別介面載入原版 HTML，並檢查公開網站。

## GitHub Pages 設定

若 GitHub Actions 顯示 `Create Pages site failed` 或 `Get Pages site failed`，在儲存庫的 **Settings → Pages → Build and deployment → Source** 選 **GitHub Actions**。然後在 Actions 重跑「Publish MBTI Adventure Academy」，或推送更新到 `main`。

> 本網站為教學自我探索用途，非官方 MBTI 心理衡鑑；不能用來診斷、分班或評斷個人能力。性別角色形象是藝術選項，不是人格特質或性別能力的判斷。

## ImageGen 角色圖更新

此分支的程式碼已改為從 `assets/characters/{TYPE}-{male|female}.webp` 讀取男女圖片，並保留原版 80 題和 16 張原始圖卡。圖片可透過單一 ZIP 上傳：GitHub Actions 會在部署時自動解壓。必須先將 ZIP 提交至這個更新分支，再合併到 `main`。

### 最簡單的手機部署方式（只需上傳一個 ZIP）

此版本的 GitHub Actions 已支援從套件 ZIP 自動解壓圖片及程式，不需要在手機上逐張上傳 64 張 WebP。

1. 下載 `MBTI_32_ImageGen_Character_Cards_GitHub_Ready.zip`，**不要解壓縮**。
2. 在 GitHub 切到 `imagegen-32-character-cards` 分支，在儲存庫根目錄選 `Add file → Upload files`，上傳 ZIP 原檔；確認 Commit 至該分支。
3. 發起 Pull request，把 `imagegen-32-character-cards` 合併至 `main`。
4. GitHub Actions 的驗證及發佈工作會在執行時從 ZIP 提取 `assets/characters/`、`assets/portraits/`、`assets/gender-cards.js` 和檢查程式，再發佈到 GitHub Pages。

**注意：** 工作流程要求 ZIP 必須放在儲存庫根目錄，且檔案名稱完全相同；它不會把 ZIP 自身直接當網站圖片使用。

## 學生端與教師教材

正式網站學生首頁僅保留「開始測驗」、性別形象選擇和測驗流程；不提供管理、教師指南與題庫瀏覽入口。GitHub 程式庫中仍保留原始 80 題題庫與計分資料，以保護測驗完整性。教師簡報另以 PPTX 檔提供，不放在學生首頁。

結果說明及其圖片下載完全由使用者瀏覽器產生，不將個人答案、暱稱或性別選項上傳伺服器。MBTI 風格是課堂探索活動，非診斷工具，測驗結果不得作為能力判定、分班或評分依據。
