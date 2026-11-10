/**
 * POPRIO Visual Editor REST API Client
 *
 * Communicates with the companion WordPress plugin REST controller (/wp-json/poprio/v1/...)
 * using X-WP-Nonce authentication.
 *
 * Automatically falls back to localStorage mock persistence when running in standalone Vite mode
 * or when the WordPress REST endpoint is offline, ensuring 100% development capability.
 */

import { PoprioContentSchema } from '../types/content';
import { getDefaultContentSchema } from '../context/PoprioContentContext';

const LOCAL_STORAGE_KEY_PUBLISHED = 'poprio_mock_published';
const LOCAL_STORAGE_KEY_DRAFT = 'poprio_mock_draft';
const LOCAL_STORAGE_KEY_REVISIONS = 'poprio_mock_revisions';

export interface RevisionMeta {
  id: string;
  timestamp: string;
  author_id: number;
  author_name: string;
  summary: string;
}

export interface ContentApiResponse {
  status: string;
  published: PoprioContentSchema;
  draft?: PoprioContentSchema | null;
  has_draft?: boolean;
  can_edit?: boolean;
  can_publish?: boolean;
}

function getWpData() {
  if (typeof window !== 'undefined') {
    return (window as any).POPRIO_DATA;
  }
  return undefined;
}

function getRestBaseUrl(): string | null {
  const wp = getWpData();
  return wp?.restUrl || null;
}

function getWpNonce(): string | null {
  const wp = getWpData();
  return wp?.wpNonce || null;
}

/**
 * Fetch current published and draft content.
 */
export async function apiFetchContent(): Promise<ContentApiResponse> {
  const restUrl = getRestBaseUrl();
  const nonce = getWpNonce();

  if (restUrl) {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (nonce) {
        headers['X-WP-Nonce'] = nonce;
      }

      const res = await fetch(`${restUrl}/content`, {
        method: 'GET',
        headers,
      });

      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch (err) {
      console.warn('POPRIO Visual Editor: Remote REST API unreachable, falling back to local storage.', err);
    }
  }

  // Fallback: LocalStorage mock
  if (typeof window !== 'undefined') {
    const rawPublished = localStorage.getItem(LOCAL_STORAGE_KEY_PUBLISHED);
    const rawDraft = localStorage.getItem(LOCAL_STORAGE_KEY_DRAFT);

    const published: PoprioContentSchema = rawPublished
      ? JSON.parse(rawPublished)
      : getDefaultContentSchema();

    const draft: PoprioContentSchema | null = rawDraft
      ? JSON.parse(rawDraft)
      : null;

    return {
      status: 'success',
      published,
      draft,
      has_draft: draft !== null,
      can_edit: true,
      can_publish: true,
    };
  }

  return {
    status: 'success',
    published: getDefaultContentSchema(),
    draft: null,
    has_draft: false,
    can_edit: true,
    can_publish: true,
  };
}

/**
 * Save draft content.
 */
export async function apiSaveDraft(
  content: PoprioContentSchema
): Promise<{ status: string; message: string; draft: PoprioContentSchema }> {
  const restUrl = getRestBaseUrl();
  const nonce = getWpNonce();

  if (restUrl && nonce) {
    try {
      const res = await fetch(`${restUrl}/content/draft`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify({ content }),
      });

      if (res.ok) {
        return await res.json();
      }
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Failed to save draft (${res.status})`);
    } catch (err: any) {
      console.warn('Remote draft save failed, storing locally:', err);
    }
  }

  // Local fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY_DRAFT, JSON.stringify(content));
  }

  return {
    status: 'success',
    message: 'Draft saved locally.',
    draft: content,
  };
}

/**
 * Publish content to the live site.
 */
export async function apiPublishContent(
  content: PoprioContentSchema,
  summary: string = ''
): Promise<{ status: string; message: string; published: PoprioContentSchema }> {
  const restUrl = getRestBaseUrl();
  const nonce = getWpNonce();

  if (restUrl && nonce) {
    try {
      const res = await fetch(`${restUrl}/content/publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify({ content, summary }),
      });

      if (res.ok) {
        return await res.json();
      }
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Failed to publish content (${res.status})`);
    } catch (err: any) {
      console.warn('Remote publish failed, updating locally:', err);
    }
  }

  // Local fallback
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_KEY_PUBLISHED, JSON.stringify(content));
    localStorage.removeItem(LOCAL_STORAGE_KEY_DRAFT);

    // Record mock revision
    const rawRevs = localStorage.getItem(LOCAL_STORAGE_KEY_REVISIONS);
    const revs: RevisionMeta[] = rawRevs ? JSON.parse(rawRevs) : [];
    revs.unshift({
      id: `rev_mock_${Date.now()}`,
      timestamp: new Date().toISOString(),
      author_id: 1,
      author_name: 'Local Developer',
      summary: summary || 'Published changes',
    });
    if (revs.length > 10) revs.pop();
    localStorage.setItem(LOCAL_STORAGE_KEY_REVISIONS, JSON.stringify(revs));
  }

  return {
    status: 'success',
    message: 'Content published locally.',
    published: content,
  };
}

/**
 * Discard draft or reset factory defaults.
 */
export async function apiResetContent(
  target: 'draft' | 'defaults' = 'draft'
): Promise<{ status: string; message: string; content: PoprioContentSchema }> {
  const restUrl = getRestBaseUrl();
  const nonce = getWpNonce();

  if (restUrl && nonce) {
    try {
      const res = await fetch(`${restUrl}/content/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify({ target }),
      });

      if (res.ok) {
        return await res.json();
      }
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Failed to reset (${res.status})`);
    } catch (err: any) {
      console.warn('Remote reset failed, resetting locally:', err);
    }
  }

  // Local fallback
  if (typeof window !== 'undefined') {
    if (target === 'draft') {
      localStorage.removeItem(LOCAL_STORAGE_KEY_DRAFT);
      const rawPublished = localStorage.getItem(LOCAL_STORAGE_KEY_PUBLISHED);
      const published = rawPublished
        ? JSON.parse(rawPublished)
        : getDefaultContentSchema();
      return {
        status: 'success',
        message: 'Draft discarded.',
        content: published,
      };
    } else {
      const defaults = getDefaultContentSchema();
      localStorage.setItem(LOCAL_STORAGE_KEY_PUBLISHED, JSON.stringify(defaults));
      localStorage.removeItem(LOCAL_STORAGE_KEY_DRAFT);
      return {
        status: 'success',
        message: 'Reset to factory defaults.',
        content: defaults,
      };
    }
  }

  return {
    status: 'success',
    message: 'Reset complete.',
    content: getDefaultContentSchema(),
  };
}

/**
 * Fetch past 10 revisions.
 */
export async function apiFetchRevisions(): Promise<RevisionMeta[]> {
  const restUrl = getRestBaseUrl();
  const nonce = getWpNonce();

  if (restUrl) {
    try {
      const headers: Record<string, string> = {
        'Accept': 'application/json',
      };
      if (nonce) {
        headers['X-WP-Nonce'] = nonce;
      }

      const res = await fetch(`${restUrl}/revisions`, {
        method: 'GET',
        headers,
      });

      if (res.ok) {
        const json = await res.json();
        return json.revisions || [];
      }
    } catch (err) {
      console.warn('Remote revisions fetch failed, checking local:', err);
    }
  }

  // Local fallback
  if (typeof window !== 'undefined') {
    const rawRevs = localStorage.getItem(LOCAL_STORAGE_KEY_REVISIONS);
    return rawRevs ? JSON.parse(rawRevs) : [];
  }

  return [];
}

/**
 * Restore a specific revision by ID.
 */
export async function apiRestoreRevision(
  revisionId: string
): Promise<{ status: string; message: string; published: PoprioContentSchema }> {
  const restUrl = getRestBaseUrl();
  const nonce = getWpNonce();

  if (restUrl && nonce) {
    try {
      const res = await fetch(`${restUrl}/revisions/restore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-WP-Nonce': nonce,
        },
        body: JSON.stringify({ revision_id: revisionId }),
      });

      if (res.ok) {
        return await res.json();
      }
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.message || `Failed to restore revision (${res.status})`);
    } catch (err: any) {
      console.warn('Remote revision restore failed:', err);
    }
  }

  return {
    status: 'error',
    message: 'Could not restore revision remotely.',
    published: getDefaultContentSchema(),
  };
}

