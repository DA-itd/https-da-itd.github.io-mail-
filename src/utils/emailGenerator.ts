import { Block, InstitutionSettings } from '../types';

export function fixGithubUrl(url: string) {
  if (url && url.includes('github.com') && url.includes('/blob/')) {
    return url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
  }
  return url;
}

export function buildEmailHTML(blocks: Block[], settings: InstitutionSettings): string {
  let rows = '';
  blocks.forEach((block) => {
    let cell = '';
    let style = 'font-family:Arial,sans-serif;color:#333;';

    if (block.type === 'text') {
      const align = block.align || 'left';
      style += `padding:10px 30px;font-size:16px;line-height:1.6;text-align:${align};`;
      if (block.bgImage && block.bgImage.trim()) {
        const imgUrl = fixGithubUrl(block.bgImage);
        const sz = block.bgSize || 'contain';
        let whiteCover = 1 - (block.bgOpacity || 0.08);
        whiteCover = Math.min(0.97, Math.max(0.6, whiteCover));
        style += `background-image:url('${imgUrl}');background-repeat:no-repeat;background-position:center center;background-size:${sz};`;
        cell = `<div style="background-color:rgba(255,255,255,${whiteCover.toFixed(2)});padding:0;font-size:16px;line-height:1.6;">${block.content || ''}</div>`;
      } else {
        cell = block.content || '';
      }
    } else if (block.type === 'box') {
      style += 'padding:15px 30px;';
      cell = `<table width="100%" cellpadding="0" cellspacing="0" style="background-color:${block.bgColor};border-radius:6px;"><tr><td style="padding:20px;color:${block.textColor};font-size:15px;text-align:${block.align || 'center'};">${block.content || ''}</td></tr></table>`;
    } else if (block.type === 'header_tri') {
      style += 'padding:10px 20px;';
      const lw = block.logoWidth || 60;
      cell = `<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>
          <td width="20%" align="left" valign="middle"><img src="${fixGithubUrl(block.logo1 || '')}" style="width:${lw}%;max-width:100px;height:auto;display:block;" alt=""></td>
          <td width="60%" align="center" valign="middle" style="padding:0 10px;"><div style="color:${settings.accentColor};font-weight:bold;font-size:14px;line-height:1.2;margin-bottom:4px;text-transform:uppercase;">${block.line1 || ''}</div><div style="color:#555;font-size:13px;">${block.line2 || ''}</div></td>
          <td width="20%" align="right" valign="middle"><img src="${fixGithubUrl(block.logo2 || '')}" style="width:${lw}%;max-width:100px;height:auto;display:block;margin-left:auto;" alt=""></td>
          </tr></table>`;
    } else if (block.type === 'columns') {
      style += 'padding:10px 20px;';
      const c1 = block.col1Type === 'image' ? `<img src="${fixGithubUrl(block.col1Content || '')}" style="width:${block.col1Width || 100}%;max-width:100%;height:auto;" alt="">` : `<div>${block.col1Content || ''}</div>`;
      const c2 = block.col2Type === 'image' ? `<img src="${fixGithubUrl(block.col2Content || '')}" style="width:${block.col2Width || 100}%;max-width:100%;height:auto;" alt="">` : `<div>${block.col2Content || ''}</div>`;
      cell = `<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr>
          <td width="50%" valign="middle" align="${block.col1Align || 'left'}" style="padding-right:10px;">${c1}</td>
          <td width="50%" valign="middle" align="${block.col2Align || 'left'}" style="padding-left:10px;">${c2}</td>
          </tr></table>`;
    } else if (block.type === 'image') {
      style += `padding:10px 30px;text-align:${block.align || 'center'};`;
      if (block.url) {
        cell = `<img src="${fixGithubUrl(block.url)}" style="width:${block.width || 100}%;max-width:100%;height:auto;display:inline-block;" alt="">`;
      }
    } else if (block.type === 'separator') {
      cell = `<div align="center"><hr style="width:${block.width || 90}%;border:0;border-top:${block.thickness || 2}px ${block.style || 'solid'} ${block.color};margin:15px auto;"></div>`;
    } else if (block.type === 'button') {
      style += 'padding:20px;text-align:center;';
      cell = `<a href="${block.link || '#'}" style="background:${block.btnColor || '#1b396a'};color:white;padding:12px 24px;text-decoration:none;border-radius:4px;font-weight:bold;display:inline-block;">${block.text || 'Click'}</a>`;
    } else if (block.type === 'html') {
      cell = block.content || '';
    }

    if (cell) {
      rows += `<tr><td style="${style}">${cell}</td></tr>`;
    }
  });

  return `<table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#f1f5f9;font-family:Arial,sans-serif;">
<tr><td align="center" style="padding:20px;">
<table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.1);">
<tr><td height="6" style="background-color:${settings.accentColor};font-size:0;">&nbsp;</td></tr>
<tr><td><table width="100%" border="0" cellspacing="0" cellpadding="0"><tbody>${rows}</tbody></table></td></tr>
<tr><td align="center" style="background-color:#f8fafc;padding:20px;font-size:11px;color:#64748b;border-top:1px solid #e2e8f0;">
<strong>${settings.name}</strong><br>${settings.footerText}
</td></tr>
<tr><td height="6" style="background-color:${settings.accentColor};font-size:0;">&nbsp;</td></tr>
</table></td></tr></table>`;
}
