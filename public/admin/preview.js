// Decap CMS preview templates — give Nikki a roughly-styled side-by-side mockup
// while she's editing. Uses Decap's built-in React (via h() / createElement),
// so no build step needed.
//
// Style sheet is loaded inline via registerPreviewStyle below.

(function () {
  if (!window.CMS) return;

  CMS.registerPreviewStyle('/admin/preview.css');

  // Decap 3 exposes a hyperscript `h` helper globally for preview templates.
  const h = window.h;

  // Use template literals → HTML string → dangerouslySetInnerHTML.
  function escape(s) {
    if (s == null) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function note(text) {
    return `<div class="preview-note">${escape(text)}</div>`;
  }

  function eyebrow(text) {
    return text ? `<span class="eyebrow">${escape(text)}</span>` : '';
  }

  function heading(level, text) {
    return text ? `<h${level}>${escape(text)}</h${level}>` : '';
  }

  function lead(text) {
    return text ? `<p class="lead">${escape(text)}</p>` : '';
  }

  function muted(text) {
    return text ? `<p class="muted">${escape(text)}</p>` : '';
  }

  function ph(label) {
    return `<div class="ph">${escape(label || 'Photo placeholder')}</div>`;
  }

  function ctaButtons(entry) {
    const ctaLabel = entry.get('ctaLabel');
    const ctaSecondaryLabel = entry.get('ctaSecondaryLabel');
    if (!ctaLabel && !ctaSecondaryLabel) return '';
    return `<div style="margin-top:10px;">${
      ctaLabel ? `<a class="btn-primary">${escape(ctaLabel)}</a>` : ''
    }${ctaSecondaryLabel ? `<a class="btn-secondary">${escape(ctaSecondaryLabel)} →</a>` : ''}</div>`;
  }

  // ============================================================
  // PAGES — generic hero preview
  // ============================================================
  CMS.registerPreviewTemplate('pages', createClass({
    render: function () {
      const data = this.props.entry.get('data');
      const html = `
        <div class="coach-preview">
          ${note('Preview is a rough mockup. Open the live site in another tab to see the exact result after publishing.')}
          <div class="preview-section">
            ${eyebrow(data.get('eyebrow'))}
            <h1>${escape(data.get('heroHeadline') || '(Hero headline)')}</h1>
            ${data.get('heroSubcopy') ? `<p class="lead">${escape(data.get('heroSubcopy'))}</p>` : ''}
            <div style="margin-top:10px;">
              ${data.get('primaryCtaLabel') ? `<a class="btn-primary">${escape(data.get('primaryCtaLabel'))}</a>` : ''}
              ${data.get('secondaryCtaLabel') ? `<a class="btn-secondary">${escape(data.get('secondaryCtaLabel'))} →</a>` : ''}
            </div>
          </div>
          ${data.get('acuityEmbedUrl') ? `<div class="preview-section"><strong>Booking widget</strong> embeds here from Acuity.</div>` : ''}
          ${data.get('youtubeVideoId') ? `<div class="preview-section"><strong>YouTube video</strong> embeds here: ${escape(data.get('youtubeVideoId'))}</div>` : ''}
          ${this.props.widgetFor && this.props.widgetFor('body') ? `<div class="preview-section"><strong>Page body:</strong><div style="margin-top:8px;">${this.props.widgetFor('body') || ''}</div></div>` : ''}
        </div>`;
      return h('div', { dangerouslySetInnerHTML: { __html: html } });
    },
  }));

  // ============================================================
  // SITE — flexible preview that adapts to whichever fields are present
  // ============================================================
  CMS.registerPreviewTemplate('site', createClass({
    render: function () {
      const data = this.props.entry.get('data');
      const titleText = data.get('title') || '';
      const pageText = data.get('page') || 'Shared';

      let body = '';

      // Header section: eyebrow + heading + lead
      const eyebrowText = data.get('eyebrow');
      const headingText = data.get('heading');
      const subHeading = data.get('subHeading');
      const leadText = data.get('lead');
      if (eyebrowText || headingText || subHeading || leadText) {
        body += `<div class="preview-section">
          ${eyebrow(eyebrowText)}
          ${heading(2, headingText)}
          ${heading(3, subHeading)}
          ${lead(leadText)}
        </div>`;
      }

      // Award tag (FUEL band)
      const awardTagText = data.get('awardTagText');
      if (awardTagText) {
        body += `<div class="preview-section">
          <span class="fuel-tag">${escape(awardTagText)}</span>
        </div>`;
      }

      // Pull quote
      const pullQuote = data.get('pullQuote');
      if (pullQuote) {
        body += `<div class="preview-section">
          <blockquote>"${escape(pullQuote)}"${data.get('pullQuoteCite') ? `<cite>${escape(data.get('pullQuoteCite'))}</cite>` : ''}</blockquote>
        </div>`;
      }

      // Bullets
      const bullets = data.get('bullets');
      if (bullets && bullets.size > 0) {
        body += `<div class="preview-section"><ul>${
          bullets.map((b) => `<li>${escape(b)}</li>`).join('')
        }</ul>${data.get('closingLine') ? `<p style="font-weight:700;">${escape(data.get('closingLine'))}</p>` : ''}</div>`;
      }

      // Closing line on its own
      if (!bullets || bullets.size === 0) {
        const closing = data.get('closingLine');
        if (closing) {
          body += `<div class="preview-section"><p>${escape(closing)}</p></div>`;
        }
      }

      // Doors
      const doors = data.get('doors');
      if (doors && doors.size > 0) {
        body += `<div class="preview-section"><strong style="font-size:12px; text-transform:uppercase; color:#6B7280;">Doors / feature cards</strong><div style="margin-top:10px;">${
          doors.map((d) => `<div class="door">
            <span class="tag ${escape(d.get('tagStyle') || 'teal')}">${escape(d.get('tag') || '')}</span>
            <h3>${escape(d.get('heading') || '')}</h3>
            <p class="muted">${escape(d.get('body') || '')}</p>
            <span class="btn-secondary">${escape(d.get('arrowLabel') || 'Learn more')} →</span>
          </div>`).join('')
        }</div></div>`;
      }

      // Tiles (Safe/Seen/Heard)
      const tiles = data.get('tiles');
      if (tiles && tiles.size > 0) {
        body += `<div class="preview-section"><strong style="font-size:12px; text-transform:uppercase; color:#6B7280;">Word tiles</strong><div class="grid-3" style="margin-top:10px;">${
          tiles.map((t) => `<div class="tile">
            <div class="word">${escape(t.get('word') || '')}</div>
            <p style="font-size:13px;">${escape(t.get('body') || '')}</p>
          </div>`).join('')
        }</div></div>`;
      }

      // Pricing tiers
      const tiers = data.get('tiers');
      if (tiers && tiers.size > 0) {
        body += `<div class="preview-section"><strong style="font-size:12px; text-transform:uppercase; color:#6B7280;">Pricing tiers</strong><div class="grid-3" style="margin-top:10px;">${
          tiers.map((t) => `<div class="tier${t.get('featured') ? ' featured' : ''}">
            <h3>${escape(t.get('label') || '')}</h3>
            <div class="amount">${escape(t.get('amount') || '')} ${t.get('amountNote') ? `<small>${escape(t.get('amountNote'))}</small>` : ''}</div>
            ${t.get('desc') ? `<p class="desc">${escape(t.get('desc'))}</p>` : ''}
            ${t.get('bullets') && t.get('bullets').size ? `<ul>${t.get('bullets').map((b) => `<li>${escape(b)}</li>`).join('')}</ul>` : ''}
            ${t.get('ctaLabel') ? `<a class="btn-secondary">${escape(t.get('ctaLabel'))} →</a>` : ''}
          </div>`).join('')
        }</div></div>`;
      }

      // Policy blocks
      const policies = data.get('policies');
      if (policies && policies.size > 0) {
        body += `<div class="preview-section"><strong style="font-size:12px; text-transform:uppercase; color:#6B7280;">Policy blocks</strong>${
          policies.map((p) => `<div class="policy">
            <h3>${escape(p.get('heading') || '')}</h3>
            <ul>${(p.get('bullets') || []).map((b) => `<li>${escape(b)}</li>`).join('')}</ul>
          </div>`).join('')
        }</div>`;
      }

      // Cards (icon + label + body)
      const cards = data.get('cards');
      if (cards && cards.size > 0) {
        body += `<div class="preview-section"><strong style="font-size:12px; text-transform:uppercase; color:#6B7280;">Cards</strong><div class="grid-2" style="margin-top:10px;">${
          cards.map((c) => `<div class="card">
            <div class="num">${escape(c.get('icon') || '')}</div>
            <h3 style="margin-top:6px;">${escape(c.get('label') || '')}</h3>
            <p class="muted" style="font-size:12px;">${escape(c.get('body') || '')}</p>
          </div>`).join('')
        }</div></div>`;
      }

      // Steps
      const steps = data.get('steps');
      if (steps && steps.size > 0) {
        body += `<div class="preview-section"><strong style="font-size:12px; text-transform:uppercase; color:#6B7280;">Three-step arc</strong><div class="grid-3" style="margin-top:10px;">${
          steps.map((s, i) => `<div class="card">
            <div class="num">${i + 1}</div>
            <h3>${escape(s.get('title') || '')}</h3>
            <p style="font-size:13px;">${escape(s.get('body') || '')}</p>
          </div>`).join('')
        }</div></div>`;
      }

      // Intro CTA banner
      const introCtaHeadline = data.get('introCtaHeadline');
      if (introCtaHeadline) {
        body += `<div class="preview-section" style="background:#069494; color:#fff;">
          <h3 style="color:#fff;">${escape(introCtaHeadline)}</h3>
          ${data.get('introCtaSubcopy') ? `<p style="color:rgba(255,255,255,0.9); font-size:14px;">${escape(data.get('introCtaSubcopy'))}</p>` : ''}
          ${data.get('introCtaLabel') ? `<a class="btn-primary" style="background:#fff; color:#045454;">${escape(data.get('introCtaLabel'))}</a>` : ''}
        </div>`;
      }

      // Intro band (yellow strip)
      const bandText = data.get('bandText');
      if (bandText) {
        body += `<div class="preview-section" style="background:#FFF5C5;">
          ${data.get('bandTagText') ? `<span class="fuel-tag" style="background:#231915;">${escape(data.get('bandTagText'))}</span>` : ''}
          <p style="margin-top:6px;">${escape(bandText)}</p>
        </div>`;
      }

      // Capacity grid
      const capacityGrid = data.get('capacityGrid');
      if (capacityGrid && capacityGrid.size > 0) {
        body += `<div class="preview-section"><div class="grid-4">${
          capacityGrid.map((c) => `<div class="card" style="text-align:center;">
            <div class="num">${escape(c.get('number') || '')}</div>
            <div class="num-label">${escape(c.get('label') || '')}</div>
          </div>`).join('')
        }</div>${data.get('capacityCaption') ? `<p class="muted" style="text-align:center; margin-top:10px;">${escape(data.get('capacityCaption'))}</p>` : ''}</div>`;
      }

      // Link groups (footer)
      const linkGroups = data.get('linkGroups');
      if (linkGroups && linkGroups.size > 0) {
        body += `<div class="preview-section" style="background:#231915; color:#DADADA;"><div class="grid-3">${
          linkGroups.map((g) => `<div>
            <strong style="color:#fff; font-size:12px; letter-spacing:1px; text-transform:uppercase;">${escape(g.get('heading') || '')}</strong>
            <ul style="list-style:none; padding:0; margin:8px 0 0;">
              ${(g.get('items') || []).map((i) => `<li style="padding:2px 0; color:#DADADA; font-size:13px;">${escape(i.get('label') || '')}</li>`).join('')}
            </ul>
          </div>`).join('')
        }</div></div>`;
      }

      // Rows (studio hours, etc.)
      const rows = data.get('rows');
      if (rows && rows.size > 0) {
        body += `<div class="preview-section"><strong style="font-size:12px; text-transform:uppercase; color:#6B7280;">Rows</strong><div class="rows" style="margin-top:8px;">${
          rows.map((r) => `<div class="row"><span class="label">${escape(r.get('label') || '')}:</span> <span>${escape(r.get('value') || '')}</span></div>`).join('')
        }</div></div>`;
      }

      // Contact info (address, phone, email)
      const address = data.get('address');
      const phone = data.get('phone');
      const email = data.get('email');
      if (address || phone || email) {
        body += `<div class="preview-section">
          ${address ? `<p>${escape(address).replace(/\\n/g, '<br>')}</p>` : ''}
          ${phone ? `<p><strong>${escape(phone)}</strong></p>` : ''}
          ${email ? `<p><strong>${escape(email)}</strong></p>` : ''}
        </div>`;
      }

      // Banner block
      const bannerHeadline = data.get('bannerHeadline');
      if (bannerHeadline) {
        body += `<div class="preview-section" style="background:#DBEFEF;">
          <h3 style="color:#045454;">${escape(bannerHeadline)}</h3>
          ${data.get('bannerSubcopy') ? `<p>${escape(data.get('bannerSubcopy'))}</p>` : ''}
          ${data.get('ctaLabel') ? `<a class="btn-primary" style="font-size:12px; padding:6px 12px;">${escape(data.get('ctaLabel'))} →</a>` : ''}
        </div>`;
      }

      // Generic CTA buttons at the end (final CTA blocks)
      if (data.get('heading') && (data.get('ctaLabel') || data.get('ctaSecondaryLabel'))) {
        body += `<div class="cta-strip">
          ${data.get('ctaLabel') ? `<a class="btn-primary">${escape(data.get('ctaLabel'))}</a>` : ''}
          ${data.get('ctaSecondaryLabel') ? `<a class="btn-secondary" style="color:#fff; border-color:#fff;">${escape(data.get('ctaSecondaryLabel'))} →</a>` : ''}
        </div>`;
      }

      // Body markdown (FUEL band)
      const renderedBody = this.props.widgetFor && this.props.widgetFor('body');
      const bodyContent = renderedBody ? `<div class="preview-section"><div>${typeof renderedBody === 'string' ? renderedBody : ''}</div></div>` : '';

      const html = `
        <div class="coach-preview">
          ${note(`This block lives on the <strong>${escape(pageText)}</strong> page. Preview is rough — open the live site in a new tab to see the exact rendering.`)}
          <div style="font-family:'Poppins',sans-serif; font-size:12px; font-weight:700; color:#045454; letter-spacing:1px; text-transform:uppercase; margin-bottom:8px;">${escape(titleText)}</div>
          ${body}
          ${bodyContent}
        </div>`;

      return h('div', { dangerouslySetInnerHTML: { __html: html } });
    },
  }));

  // ============================================================
  // SESSIONS — session card preview
  // ============================================================
  CMS.registerPreviewTemplate('sessions', createClass({
    render: function () {
      const data = this.props.entry.get('data');
      const html = `
        <div class="coach-preview">
          <div class="preview-section">
            ${data.get('tag') ? `<span class="tag ${escape(data.get('tagStyle') || 'teal')}">${escape(data.get('tag'))}</span>` : ''}
            <h2>${escape(data.get('title') || '(Session title)')}</h2>
            <p>${escape(data.get('summary') || '')}</p>
            <div class="rows">
              ${data.get('capacity') ? `<div class="row"><span class="label">Capacity:</span> ${escape(data.get('capacity'))}</div>` : ''}
              ${data.get('duration') ? `<div class="row"><span class="label">Length:</span> ${escape(data.get('duration'))}</div>` : ''}
              ${data.get('bestFor') ? `<div class="row"><span class="label">Best for:</span> ${escape(data.get('bestFor'))}</div>` : ''}
              ${data.get('price') ? `<div class="row"><span class="label">Price:</span> ${escape(data.get('price'))}</div>` : ''}
            </div>
          </div>
        </div>`;
      return h('div', { dangerouslySetInnerHTML: { __html: html } });
    },
  }));

  // ============================================================
  // TESTIMONIALS
  // ============================================================
  CMS.registerPreviewTemplate('testimonials', createClass({
    render: function () {
      const data = this.props.entry.get('data');
      const html = `
        <div class="coach-preview">
          <div class="preview-section" style="background:#069494; color:#fff;">
            <blockquote style="color:#fff; border-left-color:#fff;">"${escape(data.get('quote') || '(Quote)')}"</blockquote>
            <p style="margin-top:10px;"><strong>${escape(data.get('name') || '')}</strong>${data.get('role') ? ` · ${escape(data.get('role'))}` : ''}</p>
            ${data.get('featured') ? '<p style="font-size:12px; opacity:0.8;">★ Featured on home page</p>' : ''}
          </div>
        </div>`;
      return h('div', { dangerouslySetInnerHTML: { __html: html } });
    },
  }));

  // ============================================================
  // CREDENTIALS
  // ============================================================
  CMS.registerPreviewTemplate('credentials', createClass({
    render: function () {
      const data = this.props.entry.get('data');
      const html = `
        <div class="coach-preview">
          <div class="preview-section">
            <div class="num">${data.get('iconStyle') === 'featured' ? '★' : '·'}</div>
            <h3>${escape(data.get('title') || '(Credential title)')}</h3>
            <p>${escape(data.get('body') || '')}</p>
            ${data.get('linkLabel') ? `<a class="btn-secondary">${escape(data.get('linkLabel'))} →</a>` : ''}
          </div>
        </div>`;
      return h('div', { dangerouslySetInnerHTML: { __html: html } });
    },
  }));

  // ============================================================
  // FAQS
  // ============================================================
  CMS.registerPreviewTemplate('faqs', createClass({
    render: function () {
      const data = this.props.entry.get('data');
      const renderedBody = this.props.widgetFor && this.props.widgetFor('body');
      const html = `
        <div class="coach-preview">
          <div class="preview-section">
            <span class="eyebrow">${escape(data.get('category') || 'General')}</span>
            <h3>${escape(data.get('question') || '(Question)')}</h3>
            <div style="margin-top:10px; color:#1F2937;">${typeof renderedBody === 'string' ? renderedBody : ''}</div>
          </div>
        </div>`;
      return h('div', { dangerouslySetInnerHTML: { __html: html } });
    },
  }));

  // ============================================================
  // BLOG
  // ============================================================
  CMS.registerPreviewTemplate('blog', createClass({
    render: function () {
      const data = this.props.entry.get('data');
      const renderedBody = this.props.widgetFor && this.props.widgetFor('body');
      const html = `
        <div class="coach-preview">
          <div class="preview-section">
            <span class="eyebrow">${data.get('date') ? escape(new Date(data.get('date')).toLocaleDateString('en-AU')) : ''}</span>
            <h1>${escape(data.get('title') || '(Title)')}</h1>
            ${data.get('excerpt') ? `<p class="lead">${escape(data.get('excerpt'))}</p>` : ''}
            ${data.get('draft') ? `<p style="color:#B91C1C; font-weight:700; font-size:13px;">⚠ Draft — not published</p>` : ''}
            <div style="margin-top:14px;">${typeof renderedBody === 'string' ? renderedBody : ''}</div>
          </div>
        </div>`;
      return h('div', { dangerouslySetInnerHTML: { __html: html } });
    },
  }));

  // Decap exposes window.createClass (compat with the old Netlify CMS API).
  function createClass(spec) {
    return window.createClass(spec);
  }
})();
