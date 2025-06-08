# Test info

- Name: ChatWindow - Usabilidad móvil >> Selector de emojis es visible y funcional
- Location: /workspaces/vientosur/src/components/messages/ChatWindow.e2e.spec.ts:39:3

# Error details

```
TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
Call log:
  - waiting for locator('.divide-y > div, .divide-y > .p-4, .divide-y > .cursor-pointer').first() to be visible

    at /workspaces/vientosur/src/components/messages/ChatWindow.e2e.spec.ts:12:21
```

# Page snapshot

```yaml
- region "Notifications alt+T"
- heading "Red Viento Sur" [level=1]
- heading "Inicia sesión en tu cuenta" [level=2]
- text: Correo electrónico
- textbox "Correo electrónico"
- text: Contraseña
- textbox "Contraseña"
- checkbox "Recordarme"
- text: Recordarme
- link "¿Olvidaste tu contraseña?":
  - /url: "#"
- button "Iniciar sesión"
- text: O continuar con
- button "Google Continuar con Google":
  - img "Google"
  - text: Continuar con Google
- paragraph:
  - text: ¿No tienes una cuenta?
  - link "Regístrate":
    - /url: /register
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | // Pruebas de usabilidad móvil para el chat
   4 |
   5 | test.describe('ChatWindow - Usabilidad móvil', () => {
   6 |   test.beforeEach(async ({ page }) => {
   7 |     await page.goto('http://localhost:5174/direct-messages'); // Ruta correcta para Playwright
   8 |     await page.setViewportSize({ width: 375, height: 700 }); // Simula móvil
   9 |     // Seleccionar la primera conversación disponible
  10 |     const firstConv = page.locator('.divide-y > div, .divide-y > .p-4, .divide-y > .cursor-pointer').first();
  11 |     // Esperar a que la lista de conversaciones esté visible
> 12 |     await firstConv.waitFor({ state: 'visible', timeout: 5000 });
     |                     ^ TimeoutError: locator.waitFor: Timeout 5000ms exceeded.
  13 |     await firstConv.click();
  14 |   });
  15 |
  16 |   test('El input de mensaje es visible y usable', async ({ page }) => {
  17 |     const input = page.locator('input[placeholder="Escribe un mensaje..."]');
  18 |     await expect(input).toBeVisible();
  19 |     await input.fill('Hola desde Playwright');
  20 |     await expect(input).toHaveValue('Hola desde Playwright');
  21 |   });
  22 |
  23 |   test('Botón de enviar es tocable y envía mensaje', async ({ page }) => {
  24 |     const input = page.locator('input[placeholder="Escribe un mensaje..."]');
  25 |     await input.fill('Mensaje de prueba');
  26 |     const sendBtn = page.locator('button:has-text("Enviar")');
  27 |     await expect(sendBtn).toBeVisible();
  28 |     await sendBtn.click();
  29 |     await expect(input).toHaveValue('');
  30 |   });
  31 |
  32 |   test('Menú de adjuntos se despliega correctamente', async ({ page }) => {
  33 |     const optionsBtn = page.locator('button[aria-label="Más opciones"]');
  34 |     await optionsBtn.click();
  35 |     const mediaBtn = page.locator('button:has-text("Foto/Video")');
  36 |     await expect(mediaBtn).toBeVisible();
  37 |   });
  38 |
  39 |   test('Selector de emojis es visible y funcional', async ({ page }) => {
  40 |     const emojiBtn = page.locator('button[aria-label="Emojis"]');
  41 |     await emojiBtn.click();
  42 |     const emojiPicker = page.locator('.emoji-picker, .absolute.z-50');
  43 |     await expect(emojiPicker).toBeVisible();
  44 |   });
  45 |
  46 |   test('Botón de micrófono es tocable', async ({ page }) => {
  47 |     const micBtn = page.locator('button[aria-label="Grabar audio"]');
  48 |     await expect(micBtn).toBeVisible();
  49 |   });
  50 |
  51 |   test('Se puede reaccionar a un mensaje', async ({ page }) => {
  52 |     // Enviar mensaje primero
  53 |     const input = page.locator('input[placeholder="Escribe un mensaje..."]');
  54 |     await input.fill('Mensaje para reacción');
  55 |     await page.locator('button:has-text("Enviar")').click();
  56 |     // Abrir menú contextual del mensaje (simular click)
  57 |     const msg = page.locator('.group').last();
  58 |     await msg.click();
  59 |     // Click en reacción 👍
  60 |     await page.locator('button[title="Reaccionar"]:has-text("👍")').click();
  61 |     // Verificar que la reacción aparece
  62 |     await expect(msg.locator('span')).toHaveText('👍');
  63 |   });
  64 |
  65 |   test('Se puede responder a un mensaje', async ({ page }) => {
  66 |     // Enviar mensaje primero
  67 |     const input = page.locator('input[placeholder="Escribe un mensaje..."]');
  68 |     await input.fill('Mensaje para responder');
  69 |     await page.locator('button:has-text("Enviar")').click();
  70 |     // Abrir menú contextual del mensaje
  71 |     const msg = page.locator('.group').last();
  72 |     await msg.click();
  73 |     // Click en responder
  74 |     await page.locator('button[title="Responder"]').click();
  75 |     // Verificar que aparece el campo de respuesta
  76 |     await expect(page.locator('div:has-text("Respondiendo a")')).toBeVisible();
  77 |     // Enviar respuesta
  78 |     await input.fill('Esta es una respuesta');
  79 |     await page.locator('button:has-text("Enviar")').click();
  80 |     // Verificar que el nuevo mensaje muestra "Respondiendo a"
  81 |     const lastMsg = page.locator('.group').last();
  82 |     await expect(lastMsg).toContainText('Respondiendo a: Mensaje para responder');
  83 |   });
  84 |
  85 |   test('Se puede eliminar un mensaje propio', async ({ page }) => {
  86 |     // Enviar mensaje primero
  87 |     const input = page.locator('input[placeholder="Escribe un mensaje..."]');
  88 |     await input.fill('Mensaje para eliminar');
  89 |     await page.locator('button:has-text("Enviar")').click();
  90 |     // Abrir menú contextual del mensaje
  91 |     const msg = page.locator('.group').last();
  92 |     await msg.click();
  93 |     // Click en eliminar
  94 |     await page.locator('button[title="Eliminar"]').click();
  95 |     // Verificar que el mensaje ya no está
  96 |     await expect(msg).not.toBeVisible();
  97 |   });
  98 | });
  99 |
```